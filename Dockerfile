# syntax=docker/dockerfile:1.4

# Arguments with default value (for build).
ARG NODE_ENV=production
ARG NODE_VERSION=20
ARG GO_VERSION=1.21

# -----------------------------------------------------------------------------
# This is base image with `pnpm` package manager
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS base_web
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest-8 --activate
WORKDIR /app

# -----------------------------------------------------------------------------
# Build the web application
# -----------------------------------------------------------------------------
FROM base_web AS builder_web
COPY --chown=node:node . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store NODE_ENV=${NODE_ENV} pnpm build

# -----------------------------------------------------------------------------
# Build the application binaries
# -----------------------------------------------------------------------------
FROM golang:${GO_VERSION}-alpine as builder
WORKDIR /app

ARG APP_VERSION "0.0.0"
ARG BUILD_DATE "0000-00-00T00:00:00Z"
ENV APP_VERSION $APP_VERSION
ENV BUILD_DATE $BUILD_DATE

ENV LDFLAG_PREFIX "github.com/pingplop/pingplop/meta"
ENV CGO_ENABLED 0

COPY --from=builder_web /app/ .
RUN --mount=type=cache,id=go,target=/go/pkg/mod --mount=type=cache,id=go,target=/root/.cache/go-build \
  go mod download && go mod tidy

# BUILD_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
RUN --mount=type=cache,id=go,target=/go/pkg/mod --mount=type=cache,id=go,target=/root/.cache/go-build go build \
  --ldflags="-w -s -extldflags '-static' -X ${LDFLAG_PREFIX}.Version=${APP_VERSION} -X ${LDFLAG_PREFIX}.BuildDate=${BUILD_DATE}" \
  -trimpath -a -o pingplop cmd/app/main.go

# -----------------------------------------------------------------------------
# Use the slim image for a lean production container.
# -----------------------------------------------------------------------------
FROM alpine:3.18 as runner
LABEL org.opencontainers.image.source="https://github.com/pingplop/pingplop"
WORKDIR /app

ARG JWT_SECRET
ARG DATABASE_URL
ARG DATABASE_AUTH_TOKEN
ARG DATABASE_DRIVER

ENV JWT_SECRET $JWT_SECRET
ENV DATABASE_URL $DATABASE_URL
ENV DATABASE_AUTH_TOKEN $DATABASE_AUTH_TOKEN
ENV DATABASE_DRIVER $DATABASE_DRIVER

# Don't run production as root, spawns command as a child process.
RUN addgroup --system --gid 1001 nonroot && adduser --system --uid 1001 nonroot
RUN apk update && apk add --no-cache tini ca-certificates
RUN mkdir -p /app/data && chmod -R 755 /app && chown -R nonroot:nonroot /app

COPY --from=builder --chown=nonroot:nonroot /app/pingplop /app/pingplop

USER nonroot
EXPOSE 3080

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/app/pingplop", "--address", "0.0.0.0:3080"]
