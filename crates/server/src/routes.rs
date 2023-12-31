// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use axum::{routing::get, Router};

pub fn init() -> Router {
    Router::new().route("/", get(|| async move { "Welcome to Pingplop" }))
}
