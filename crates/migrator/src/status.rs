// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use anyhow::{bail, Result};
use std::path::PathBuf;

use super::config::{database_url, migration_folder};
use super::utils::{get_local_migrations, read_file_content};
use crate::driver;

#[allow(dead_code)]
pub async fn status(verbose: bool) -> Result<()> {
    let database_url = database_url()?;
    let mut database = driver::new(&database_url).await?;
    let folder = migration_folder();

    let path = PathBuf::from(&folder);
    let files = match get_local_migrations(&path, "up") {
        Ok(f) => f,
        Err(err) => {
            bail!("Couldn't read migration folder {:?}: {:?}", path, err)
        }
    };

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

        if !migrations.contains(&id) {
            if verbose {
                let query = read_file_content(&f.1);
                tracing::info!("Pending migration {}: \n {}", id, query);
            } else {
                tracing::info!("Pending {}", id);
            }
        }
    }

    Ok(())
}
