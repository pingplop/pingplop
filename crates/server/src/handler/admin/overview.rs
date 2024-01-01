// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use askama::Template;
use axum::response::IntoResponse;

#[derive(Template)]
#[template(path = "admin/index.html")]
struct DashboardTemplate {}

#[axum::debug_handler]
pub async fn index() -> impl IntoResponse {
    DashboardTemplate {}
}
