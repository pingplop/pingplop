// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use crate::prelude::*;

use anyhow::anyhow;
use libsql_client::{Client, Config};
use url::Url;

pub async fn init(url: &str, auth_token: Option<String>) -> anyhow::Result<Client> {
    trace_info!("Connecting to database {url}");

    let url = Url::parse(url).unwrap();
    let client = Client::from_config(Config { url, auth_token })
        .await
        .map_err(|e| anyhow!(e))?;

    trace_info!("Connected to the database successfully!");

    Ok(client)
}
