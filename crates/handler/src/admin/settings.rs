// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use askama::Template;
use axum::response::IntoResponse;

#[derive(Template)]
#[template(path = "admin/settings.html")]
struct SettingsTemplate {}

#[axum::debug_handler]
pub async fn settings() -> impl IntoResponse {
    SettingsTemplate {}
}
