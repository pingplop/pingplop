// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use axum::{routing::get, Router};

use crate::handler::{admin, api, auth, home};
use corelib::http::response;

pub fn init() -> Router {
    Router::new()
        // .route_layer(middleware::from_fn(fallback_on_none))
        .route("/", get(home::index))
        .route("/assets/favicon.svg", get(home::favicon))
        .route("/assets/css/styles.css", get(home::styles))
        .route("/assets/js/app.js", get(home::mainjs))
        .route("/maintenance", get(home::maintenance))
        .route("/incidents", get(home::incidents))
        .merge(auth_routes())
        .nest_service("/-", admin_routes())
        .nest_service("/api", api_routes())
        .fallback(home::fallback_404_web)
}

fn api_routes() -> Router {
    Router::new()
        .route("/", get(api::index))
        .route("/health", get(api::health))
        .fallback(response::fallback_api)
}

fn auth_routes() -> Router {
    Router::new()
        .route("/login", get(auth::login))
        .route("/register", get(auth::register))
        .route("/forgot-password", get(auth::forgot_password))
}

fn admin_routes() -> Router {
    Router::new()
        .route("/", get(admin::index))
        .route("/monitors", get(admin::monitors))
        .route("/heartbeat", get(admin::heartbeat))
        .route("/incidents", get(admin::incidents))
        .route("/pages", get(admin::pages))
        .route("/settings", get(admin::settings))
        .fallback(home::fallback_404_web)
}
