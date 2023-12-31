// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use axum::{routing::get, Router};

use corelib::http::response;
use handler::{api, home};

const NOT_YET: &'static str = "Not yet implemented!";

pub fn init() -> Router {
    Router::new()
        .route("/", get(home::index))
        .route("/assets/styles.css", get(home::styles))
        .route("/maintenance", get(home::maintenance))
        .route("/incidents", get(home::incidents))
        .merge(auth_routes())
        .nest_service("/admin", admin_routes())
        .nest_service("/api", api_routes())
}

fn api_routes() -> Router {
    Router::new()
        .route("/", get(api::index))
        .route("/health", get(api::health))
        .fallback(response::fallback_api)
}

fn auth_routes() -> Router {
    Router::new()
        .route("/login", get(|| async move { NOT_YET }))
        .route("/register", get(|| async move { NOT_YET }))
        .route("/forgot-password", get(|| async move { NOT_YET }))
}

fn admin_routes() -> Router {
    Router::new()
        .route("/", get(|| async move { NOT_YET }))
        .route("/monitors", get(|| async move { NOT_YET }))
        .route("/heartbeat", get(|| async move { NOT_YET }))
        .route("/incidents", get(|| async move { NOT_YET }))
        .route("/pages", get(|| async move { NOT_YET }))
        .route("/settings", get(|| async move { NOT_YET }))
}
