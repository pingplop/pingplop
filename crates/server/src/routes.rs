// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use axum::{routing::get, Router};

use corelib::http::response;
use handler::{api, home};

pub fn init() -> Router {
    Router::new()
        .route("/", get(home::index))
        .route("/assets/styles.css", get(home::styles))
        .route("/maintenance", get(home::maintenance))
        .route("/incidents", get(home::incidents))
        .nest_service("/api", api_routes())
}

fn api_routes() -> Router {
    Router::new()
        .route("/", get(api::index))
        .route("/health", get(api::health))
        .fallback(response::fallback_api)
}
