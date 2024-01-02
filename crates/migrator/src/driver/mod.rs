// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

mod libsql;
mod sqlite;

use anyhow::bail;
use serde::{Deserialize, Serialize};
use std::future::Future;
use std::pin::Pin;

use crate::config;

#[derive(Debug, Serialize, Deserialize)]
pub struct SchemaMigration {
    pub id: String,
}

// DatabaseDriver is a trait that all database drivers must implement
pub trait DatabaseDriver {
    // execute giving query for the specifiv
    fn execute<'a>(
        &'a mut self,
        query: &'a str,
    ) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>>;

    // create database with the specific driver
    fn create_database(&mut self) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>>;

    // drop database with the specific driver
    fn drop_database(&mut self) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>>;

    // get current schema migrations for the schema migrations table
    fn get_or_create_migrations_table(
        &mut self,
    ) -> Pin<Box<dyn Future<Output = Result<Vec<String>, anyhow::Error>> + '_>>;

    // insert new schema migration
    fn insert_schema_migration<'a>(
        &'a mut self,
        id: &'a str,
    ) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>>;

    // remove schema migration from the schema migrations table
    fn remove_schema_migration<'a>(
        &'a mut self,
        id: &'a str,
    ) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>>;

    // create database with the specific driver
    fn ready(&mut self) -> Pin<Box<dyn Future<Output = Result<(), anyhow::Error>> + '_>>;
}

// Creates a new database driver based on the database_url
pub async fn new(db_url: &str) -> Result<Box<dyn DatabaseDriver>, anyhow::Error> {
    let parsed_db_url = url::Url::parse(db_url)?;
    let scheme = parsed_db_url.scheme();

    match scheme {
        "https" | "http" | "libsql" => {
            let token = config::database_token();
            let driver = libsql::LibSQLDriver::new(parsed_db_url.as_str(), token).await?;
            Ok(Box::new(driver))
        }
        "sqlite" | "sqlite3" => {
            let driver = sqlite::SqliteDriver::new(db_url).await?;
            Ok(Box::new(driver))
        }
        _ => bail!("Unsupported database driver: {}", scheme),
    }
}
