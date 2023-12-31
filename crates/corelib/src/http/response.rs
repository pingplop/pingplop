// Copyright 2023-current Aris Ripandi <pingplop@skiff.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

use crate::prelude::*;

use axum::response::IntoResponse;
use axum::{http::StatusCode, Json};
use serde::{Deserialize, Serialize};

/// Represents metadata information for paginated responses.
#[derive(Debug, Deserialize, Serialize)]
pub struct Metadata {
    pub total: u64,        // Total available rows
    pub limit: u64,        // Size limit per page
    pub current_page: u64, // Number of current page
    pub last_page: u64,    // Number of last page
}

/// Represents pagination links for navigating through paginated responses.
#[derive(Debug, Deserialize, Serialize)]
pub struct Pagination {
    #[serde(rename = "self")]
    pub this: String, // The link to the current page.
    pub first: String,        // The link to the first page.
    pub last: String,         // The link to the last page.
    pub next: Option<String>, // The link to the next page, if available.
    pub prev: Option<String>, // The link to the previous page, if available.
}

#[derive(Debug, Deserialize, Serialize)]
pub struct JsonResponse<T = &'static str> {
    pub status: u16,   // Status code for the API response.
    pub success: bool, // Indicates whether the API request was successful or not.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub message: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<T>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub links: Option<Pagination>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub meta: Option<Metadata>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<ErrorPayload>,
}

impl<T> Default for JsonResponse<T> {
    fn default() -> Self {
        JsonResponse {
            status: StatusCode::OK.as_u16(),
            success: true,
            message: None,
            data: None,
            links: None,
            meta: None,
            error: None,
        }
    }
}

impl<T> JsonResponse<T> {
    // Method to create an instance with specific fields filled in
    pub fn new(status: StatusCode) -> Self {
        let mut response = Self::default();
        response.status = status.as_u16();
        response
    }

    #[allow(dead_code)]
    pub fn success(mut self, success: bool) -> Self {
        self.success = success;
        self
    }

    // Method to set the message
    pub fn message(mut self, message: &str) -> Self {
        self.message = Some(message.to_string());
        self
    }

    // Method to set the data
    pub fn with_data(mut self, data: T) -> Self {
        self.data = Some(data);
        self
    }

    // Method to set metadata
    pub fn with_metadata(mut self, metadata: Metadata) -> Self {
        self.meta = Some(metadata);
        self
    }

    // Method to set pagination
    pub fn with_pagination(mut self, pagination: Pagination) -> Self {
        self.links = Some(pagination);
        self
    }

    // Method to set the error using JsonResponse::new()
    #[allow(dead_code)]
    pub fn with_error(mut self, message: &str, error_code: Option<u16>) -> Self {
        self.error = Some(ErrorPayload {
            code: error_code,
            message: message.to_string(),
        });
        self.success = false;
        self
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ErrorPayload {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub code: Option<u16>, // Status code for the error response.
    pub message: String, // Message associated with the error response.
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ErrorResponse {
    pub status: u16,         // HTTP status code for the API response.
    pub success: bool,       // Indicates whether the API request was successful or not.
    pub error: ErrorPayload, // Details about the error, including a description and possibly additional information.
}

impl ErrorResponse {
    pub fn new(status: StatusCode, message: String, code: Option<u16>) -> Self {
        Self {
            status: status.as_u16(),
            success: false,
            error: ErrorPayload { code, message },
        }
    }
}

/// Utility function for mapping any error into ErrorResponse.
pub fn throw_response<E>(
    status: StatusCode,
    err: E,
    code: Option<u16>,
) -> (StatusCode, Json<ErrorResponse>)
where
    E: std::error::Error,
{
    trace_error!("{err:?}");
    let response = ErrorResponse::new(status, err.to_string(), code);
    (status, Json(response))
}

/// Utility function for mapping any error into ErrorResponse with string message.
pub fn throw_response_str(
    status: StatusCode,
    err: String,
    code: Option<u16>,
) -> (StatusCode, Json<ErrorResponse>) {
    trace_error!("{err}");
    let response = ErrorResponse::new(status, err.into(), code);
    (status, Json(response))
}

pub async fn fallback_api() -> impl IntoResponse {
    let status = StatusCode::NOT_FOUND;
    let response = ErrorResponse::new(status, "Resource not found".into(), None);
    (status, Json(response))
}
