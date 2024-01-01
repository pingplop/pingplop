// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use corelib::prelude::*;

use askama::Template;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};

use corelib::http::error::HttpError;

#[axum::debug_handler]
pub async fn styles() -> impl IntoResponse {
    Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "text/css")
        .body(include_str!("../static/css/styles.css").to_owned())
        .map_err(|err| {
            // Handle the error in a way that makes sense for your application.
            // Here, we'll log the error and return a generic response.
            trace_error!("Failed to render template: {}", err.to_string());
            return HttpError::InternalServerError;
        })
        .unwrap() // Safe unwrap since we're providing a known value.
}

#[axum::debug_handler]
pub async fn mainjs() -> impl IntoResponse {
    Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/javascript")
        .body(include_str!("../static/js/main.js").to_owned())
        .map_err(|err| {
            // Handle the error in a way that makes sense for your application.
            // Here, we'll log the error and return a generic response.
            trace_error!("Failed to render template: {}", err.to_string());
            return HttpError::InternalServerError;
        })
        .unwrap() // Safe unwrap since we're providing a known value.
}

#[derive(Template)]
#[template(path = "index.html")]
struct HomeTemplate<'a> {
    title: &'a str,
}

#[axum::debug_handler]
pub async fn index() -> impl IntoResponse {
    HomeTemplate {
        title: "All system operational",
    }
}

#[derive(Template)]
#[template(path = "maintenance.html")]
struct MaintenanceTemplate<'a> {
    title: &'a str,
}

#[axum::debug_handler]
pub async fn maintenance() -> impl IntoResponse {
    let title = "Scheduled maintenance";
    MaintenanceTemplate { title }
}

#[derive(Template)]
#[template(path = "incidents.html")]
struct IncidentsTemplate<'a> {
    title: &'a str,
}

#[axum::debug_handler]
pub async fn incidents() -> impl IntoResponse {
    let title = "Previous incidents";
    IncidentsTemplate { title }
}
