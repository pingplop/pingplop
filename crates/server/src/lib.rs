// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

// The application name and version, extracted from Cargo metadata.
pub const APP_NAME: &'static str = core::env!("CARGO_PKG_NAME");
pub const APP_VERSION: &'static str = core::env!("CARGO_PKG_VERSION");
pub const BUILD_TIME: &'static str = build_time::build_time_utc!("%Y-%m-%d %H:%M:%S UTC");

pub mod handler;
pub mod routes;
pub mod server;
