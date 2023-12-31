// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

// Error code prefix:
// 10xxx : http server
// 20xxx : database related
// 30xxx : external requests
// 40xxx : external requests

use crate::http::response::{ErrorPayload, ErrorResponse};
use axum::response::{IntoResponse, Response};
use axum::{http::StatusCode, Json};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum HttpError {
    #[error("Missing audience header")]
    MissingAudience,

    #[error("Missing credentials, require Authorization Token")]
    MissingCredentials,

    #[error("Missing audience header")]
    WrongCredentials,

    #[error("Token creation error")]
    TokenCreation,

    #[error("Invalid authorization token")]
    InvalidToken,

    #[error("Invalid credentials")]
    InvalidCredentials,

    #[error("Already exists")]
    DuplicateItem,

    #[error("Something wrong: internal server error")]
    InternalServerError,
}

impl IntoResponse for HttpError {
    fn into_response(self) -> Response {
        let status = match self {
            HttpError::MissingAudience => StatusCode::BAD_REQUEST,
            HttpError::MissingCredentials => StatusCode::BAD_REQUEST,
            HttpError::WrongCredentials => StatusCode::UNAUTHORIZED,
            HttpError::TokenCreation => StatusCode::INTERNAL_SERVER_ERROR,
            HttpError::InvalidToken => StatusCode::BAD_REQUEST,
            HttpError::InvalidCredentials => StatusCode::UNAUTHORIZED,
            HttpError::DuplicateItem => StatusCode::BAD_REQUEST,
            HttpError::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
        };

        let body = Json(ErrorResponse {
            status: status.as_u16(),
            success: false,
            error: ErrorPayload {
                code: None,
                message: self.to_string(),
            },
        });

        (status, body).into_response()
    }
}
