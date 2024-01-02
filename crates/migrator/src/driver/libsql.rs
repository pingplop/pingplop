// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use anyhow::{bail, Result};
use chrono::{DateTime, Utc};
use libsql_client::{de, Client, Config, Statement};
use std::future::Future;
use std::pin::Pin;

use super::DatabaseDriver;
use super::SchemaMigration;

pub struct LibSQLDriver {
    db: Client,
}

impl<'a> LibSQLDriver {
    pub async fn new<'b>(db_url: &str, token: Option<String>) -> Result<LibSQLDriver> {
        let mut config = Config::new(db_url)?;
        if let Some(token) = token {
            config = config.with_auth_token(token);
        }

        let client = match libsql_client::Client::from_config(config).await {
            Ok(c) => c,
            Err(err) => bail!("{:?}", err),
        };

        Ok(LibSQLDriver { db: client })
    }
}

impl DatabaseDriver for LibSQLDriver {
    fn execute<'a>(
        &'a mut self,
        query: &'a str,
    ) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>> {
        let fut = async move {
            let queries = query
                .split(";")
                .filter(|x| !x.trim().is_empty())
                .map(|x| Statement::new(x))
                .collect::<Vec<Statement>>();

            self.db.batch(queries).await?;

            Ok(())
        };

        Box::pin(fut)
    }

    fn get_or_create_migrations_table(
        &mut self,
    ) -> Pin<Box<dyn Future<Output = Result<Vec<String>, anyhow::Error>> + '_>> {
        let fut = async move {
            let query = "CREATE TABLE IF NOT EXISTS _migrations (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, created_at TEXT NOT NULL);";
            self.db.execute(query).await?;
            let query = "SELECT id FROM _migrations ORDER BY id DESC;";
            let result = self.db.execute(query).await?;

            let rows = result.rows.iter().map(de::from_row);

            let res = rows.collect::<Result<Vec<SchemaMigration>>>();

            res.map(|v| v.into_iter().map(|s| s.id).collect())
        };

        Box::pin(fut)
    }

    fn insert_schema_migration<'a>(
        &'a mut self,
        name: &'a str,
    ) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>> {
        let now: DateTime<Utc> = Utc::now();
        let query =
            format!("INSERT INTO _migrations (name, created_at) VALUES ('{name}', '{now}');");
        let fut = async move {
            self.db.execute(query.as_str()).await?;
            Ok(())
        };

        Box::pin(fut)
    }

    fn remove_schema_migration<'a>(
        &'a mut self,
        id: &'a str,
    ) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>> {
        let fut = async move {
            self.db
                .execute(format!("DELETE FROM _migrations WHERE id = '{}';", id).as_str())
                .await?;
            Ok(())
        };

        Box::pin(fut)
    }

    fn create_database(
        &mut self,
    ) -> Pin<Box<dyn Future<Output = std::prelude::v1::Result<(), anyhow::Error>> + '_>> {
        let fut = async move {
            bail!("Does not support creating a database, it should be done via the respective interface")
        };

        Box::pin(fut)
    }

    fn drop_database(
        &mut self,
    ) -> Pin<Box<dyn Future<Output = std::prelude::v1::Result<(), anyhow::Error>> + '_>> {
        let fut = async move {
            bail!("Does not support dropping a database, it should be done via the respective interface")
        };

        Box::pin(fut)
    }

    // SQlite don't have a HTTP connection so we don't need to check if it's ready
    fn ready(&mut self) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>> {
        let fut = async move {
            self.db.execute("SELECT 1").await?;

            Ok(())
        };

        Box::pin(fut)
    }
}
