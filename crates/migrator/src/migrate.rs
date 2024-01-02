// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use anyhow::{bail, Result};
use std::path::PathBuf;

use super::config::{database_url, migration_folder};
use super::utils::{get_local_migrations, read_file_content};
use crate::driver;

// FIXME invalid type: integer `2`, expected a string
pub async fn up() -> Result<()> {
    tracing::info!("Running database migrations");

    let folder = migration_folder();

    let path = PathBuf::from(&folder);

    let files = match get_local_migrations(&path, "up") {
        Ok(f) => f,
        Err(err) => {
            bail!("Couldn't read migration folder {:?}: {:?}", path, err)
        }
    };

    if files.is_empty() {
        bail!(
            "Didn't find any files ending with .up.sql at {}. Does the path exist?",
            folder
        );
    }

    let database_url = database_url()?;
    let mut database = driver::new(&database_url).await?;

    let migrations: Vec<String> = database
        .get_or_create_migrations_table()
        .await?
        .into_iter()
        .map(|s| s.into_boxed_str())
        .collect::<Vec<Box<str>>>()
        .into_iter()
        .map(|s| s.into())
        .collect();

    for f in files {
        let id = Box::new(f.0.to_string());

        // Extract the file stem (file name without extension)
        let migration_name =
            f.1.file_stem()
                .and_then(|file_stem| {
                    file_stem
                        .to_str()
                        .map(|s| s.trim_end_matches(".up").to_owned())
                })
                .unwrap_or_else(|| {
                    tracing::error!("Failed to get migration name");
                    String::new() // Default value in case of an error
                });

        if !migrations.contains(&id) {
            tracing::info!("Running migration {id} - {migration_name}");

            let query = read_file_content(&f.1);
            database.execute(&query).await?;
            database.insert_schema_migration(&migration_name).await?;
        }
    }

    Ok(())
}

pub async fn down(rollback_amount: &i64) -> Result<()> {
    let folder = migration_folder();

    let path = PathBuf::from(&folder);
    let files = match get_local_migrations(&path, "down") {
        Ok(f) => f,
        Err(err) => {
            bail!("Couldn't read migration folder {:?}: {:?}", path, err)
        }
    };

    if files.is_empty() {
        bail!("Didn't find any files ending with .down.sql at {folder}. Does the path exist?");
    }

    let database_url = database_url()?;
    let mut database = driver::new(&database_url).await?;

    let migrations = database
        .get_or_create_migrations_table()
        .await?
        .into_iter()
        .map(|s| s.into_boxed_str().parse::<i64>().unwrap())
        .collect::<Vec<i64>>();

    let migrations_to_run = migrations.into_iter().take(*rollback_amount as usize);

    for migration in migrations_to_run {
        let rollback_file = files.iter().find(|(timestamp, _)| timestamp == &migration);

        match rollback_file {
            None => bail!("No rollback file found for {}", migration),
            Some(f) => {
                tracing::info!("Running rollback for {}", migration);
                let query = read_file_content(&f.1);

                database.execute(&query).await?;

                database
                    .remove_schema_migration(migration.to_string().as_str())
                    .await?;
            }
        }
    }

    Ok(())
}
