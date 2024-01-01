// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use corelib::dbx;

use clap::{Parser, Subcommand};
use std::env::consts::{ARCH, OS};
use tracing_subscriber::util::SubscriberInitExt;
use tracing_subscriber::{layer::SubscriberExt, EnvFilter};

use pingplop::{APP_NAME, APP_VERSION, BUILD_TIME};

const DISPLAY_TARGET: bool = cfg!(debug_assertions);
const LOG_LEVEL: &str = if cfg!(debug_assertions) {
    "pingplop=debug,corelib=debug,tower_http=info"
} else {
    "pingplop=info,corelib=info,tower_http=info"
};

#[derive(Parser)]
#[command(about, long_about = None)]
struct Args {
    /// Address to bind
    #[arg(short = 'a', long = "address", default_value = "0.0.0.0")]
    address: String,
    /// Port to listen
    #[arg(short = 'p', long = "port", default_value = "5080")]
    port: String,
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// Generate application secret key
    SecretKey {},
    /// Run database migration
    Migrate {
        /// Force run, disable confirmation prompt
        #[arg(short = 'f', long = "force", default_value_t = false)]
        force: bool,
    },
    /// Print version information
    Version {
        /// Print short version number
        #[arg(short = 's', long = "short", default_value_t = false)]
        short: bool,
    },
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok(); // Load environment variables

    // Setup tracing a.k.a logging.
    tracing_subscriber::registry()
        .with(EnvFilter::try_from_default_env().unwrap_or_else(|_| LOG_LEVEL.into()))
        .with(tracing_subscriber::fmt::layer().with_target(DISPLAY_TARGET))
        .init();

    // Initialize database connection
    let db_url = std::env::var("DATABASE_URL").unwrap();
    let db_token = std::env::var("DATABASE_TOKEN").unwrap();
    let db = dbx::init(db_url.as_str(), Some(db_token)).await?;

    // You can check for the existence of subcommands, and if found
    // use their matches just as you would the top level command.
    let args = Args::parse();

    match args.command {
        Some(Commands::SecretKey {}) => println!("Not yet implemeted!"),
        Some(Commands::Version { short }) => print_version(short),
        Some(Commands::Migrate { force }) => println!("Not yet implemeted: {force}"),
        None => {
            // After all, run the application server
            let addr = [args.address, args.port.to_string()].join(":");
            pingplop::server::run(addr, db).await?;
        }
    }

    Ok(())
}

fn print_version(short: bool) {
    if short {
        println!("{APP_VERSION}");
    } else {
        println!("{APP_NAME} {APP_VERSION} {ARCH}-{OS} ({BUILD_TIME})");
    }
}
