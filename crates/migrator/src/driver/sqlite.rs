// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use anyhow::Result;
use chrono::{DateTime, Utc};
use libsql_client::{de, local::Client};
use std::fs::{self, File};
use std::future::Future;
use std::pin::Pin;

use super::DatabaseDriver;
use super::SchemaMigration;

pub struct SqliteDriver {
    db: Client,
    path: String,
}

impl<'a> SqliteDriver {
    pub async fn new<'b>(db_url: &str) -> Result<SqliteDriver> {
        let path = std::path::Path::new(db_url.split_once("://").unwrap().1);

        if File::open(path.to_str().unwrap()).is_err() {
            if let Some(parent) = path.parent() {
                fs::create_dir_all(parent)?;
            }

            File::create(path)?;
        }

        let client = Client::new(path.to_str().unwrap()).unwrap();

        Ok(SqliteDriver {
            db: client,
            path: path.to_str().unwrap().to_string(),
        })
    }
}

impl DatabaseDriver for SqliteDriver {
    fn execute<'a>(
        &'a mut self,
        query: &'a str,
    ) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>> {
        let fut = async move {
            let queries = query
                .split(";")
                .map(|x| x.trim())
                .filter(|x| !x.is_empty())
                .collect::<Vec<&str>>();
            for query in queries {
                self.db.execute(query)?;
            }
            Ok(())
        };

        Box::pin(fut)
    }

    fn get_or_create_migrations_table(
        &mut self,
    ) -> Pin<Box<dyn Future<Output = Result<Vec<String>, anyhow::Error>> + '_>> {
        let fut = async move {
            let query = "CREATE TABLE IF NOT EXISTS _migrations (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, created_at TEXT NOT NULL);";
            self.db.execute(query)?;
            let query = "SELECT id FROM _migrations ORDER BY id DESC;";
            let result = self.db.execute(query)?;

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
            self.db.execute(query.as_str())?;
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
                .execute(format!("DELETE FROM _migrations WHERE id = '{}';", id).as_str())?;
            Ok(())
        };

        Box::pin(fut)
    }

    fn create_database(
        &mut self,
    ) -> Pin<Box<dyn Future<Output = std::prelude::v1::Result<(), anyhow::Error>> + '_>> {
        let fut = async move { Ok(()) };

        Box::pin(fut)
    }

    fn drop_database(
        &mut self,
    ) -> Pin<Box<dyn Future<Output = std::prelude::v1::Result<(), anyhow::Error>> + '_>> {
        let fut = async move {
            fs::remove_file(&mut self.path)?;

            Ok(())
        };

        Box::pin(fut)
    }

    // SQlite don't have a HTTP connection so we don't need to check if it's ready
    fn ready(&mut self) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>> {
        let fut = async move { Ok(()) };

        Box::pin(fut)
    }
}
