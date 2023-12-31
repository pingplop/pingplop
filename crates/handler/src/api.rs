// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use axum::{http::StatusCode, response::IntoResponse, Json};

use corelib::http::response::JsonResponse;

#[axum::debug_handler]
pub async fn index() -> impl IntoResponse {
    let message = "This is default endpoint for Pingplop API";
    let response: JsonResponse<&str> = JsonResponse::new(StatusCode::OK).message(message);
    (StatusCode::OK, Json(response))
}

#[axum::debug_handler]
pub async fn health() -> impl IntoResponse {
    let response: JsonResponse<&str> = JsonResponse::new(StatusCode::OK).message("All is well");
    (StatusCode::OK, Json(response))
}
