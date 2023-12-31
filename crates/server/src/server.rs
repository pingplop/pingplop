// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use corelib::prelude::*;

use anyhow::anyhow;
use std::sync::Arc;
use std::time::Duration;

use axum::Extension;
use serde::{Deserialize, Serialize};
use tokio::{net::TcpListener, signal};
use tower_http::timeout::TimeoutLayer;
use tower_http::trace::TraceLayer;

use crate::routes;

#[derive(Debug, Deserialize, Serialize)]
pub struct ServerState {
    pub base_url: String,
}

pub async fn run(bind_addr: String) -> anyhow::Result<()> {
    // Initialize the application server states
    let server_state = Arc::new(ServerState {
        base_url: f!("http://localhost:3080"),
    });

    // Add a timeout so requests don't hang forever.
    let timeout_layer = TimeoutLayer::new(Duration::from_secs(10));
    let http_layer = TraceLayer::new_for_http();

    // Create regular Axum app, load and register routes.
    let app = routes::init()
        .layer((http_layer, timeout_layer))
        .layer(Extension(server_state));

    // Create a `TcpListener` using tokio.
    let listener = TcpListener::bind(bind_addr).await.map_err(|e| anyhow!(e))?;

    let listen_addr = listener.local_addr().map_err(|e| anyhow!(e))?;

    trace_info!("Server listening on http://{}", listen_addr);

    // Run the server with graceful shutdown
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .map_err(|e| anyhow!(e))?;

    Ok(())
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}
