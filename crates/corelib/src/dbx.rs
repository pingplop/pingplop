// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use crate::prelude::*;

use anyhow::{anyhow, Result};
use libsql_client::{Client, Config};
use url::Url;

// @ref: https://github.com/psarna/edgemail/blob/master/src/database.rs
pub struct Database {
    db: Client,
}

impl Database {
    /// Creates a new database client.
    /// If the DATABASE_URL environment variable is not set, a local database will be used.
    /// It's also possible to use a remote database by setting the DATABASE_URL environment variable.
    pub async fn new() -> Result<Self> {
        if std::env::var("DATABASE_URL").is_err() {
            let mut db_path = std::env::temp_dir();
            db_path.push("pingplop.db");
            let db_path = db_path.display();
            tracing::warn!("DATABASE_URL not set, using a default local database: {db_path}");
            std::env::set_var("DATABASE_URL", format!("file://{db_path}"));
        }

        let db_url = std::env::var("DATABASE_TOKEN").unwrap();
        let db_token = std::env::var("DATABASE_TOKEN").unwrap();

        let db = Client::from_config(Config {
            url: Url::parse(db_url.as_str()).unwrap(),
            auth_token: Some(db_token),
        })
        .await
        .map_err(|e| anyhow!(e))?;

        // You can execute any query here, such as migration, etc.

        Ok(Self { db })
    }
}

pub async fn init(url: &str, auth_token: Option<String>) -> anyhow::Result<Client> {
    trace_info!("Connecting to database {url}");

    let url = Url::parse(url).unwrap();
    let client = Client::from_config(Config { url, auth_token })
        .await
        .map_err(|e| anyhow!(e))?;

    trace_info!("Connected to the database successfully!");

    Ok(client)
}
