# syntax=docker/dockerfile:1.4

# Args value for build
ARG RUST_VERSION=1.75
ARG NODE_VERSION=20

# -----------------------------------------------------------------------------
# This is base image with `pnpm` package manager
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS base_web
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest-8 --activate

# -----------------------------------------------------------------------------
# Build the web application
# -----------------------------------------------------------------------------
FROM base_web AS builder_web
WORKDIR /app
COPY --chown=node:node . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store NODE_ENV=production pnpm build:web

# ------------------------------------------------------------------------------
# Build the application binaries on latest Debian
# ------------------------------------------------------------------------------
FROM rust:${RUST_VERSION}-bookworm AS builder
WORKDIR /usr/src

COPY --from=builder_web /app .

RUN apt-get update && apt-get -y install tini && update-ca-certificates
RUN adduser --disabled-password --no-create-home --gecos "" --uid 10001 --home "/nonexistent" --shell "/sbin/nologin" nonroot
RUN mkdir -p data && chmod -R 755 data && chown -R nonroot:nonroot data

# ARG LIBSQL_VERSION="0.22.11"
# ENV LIBSQL_VERSION $LIBSQL_VERSION
# ENV LIBSQL_FILE="libsql-server-x86_64-unknown-linux-gnu.tar.xz"
# ADD https://github.com/tursodatabase/libsql/releases/download/libsql-server-v${LIBSQL_VERSION}/${LIBSQL_FILE} /tmp/libsql-server.tar.xz
# RUN tar xf /tmp/libsql-server.tar.xz --strip-components 1 -C /tmp && chmod +x /tmp/sqld

RUN --mount=type=cache,target=/usr/local/cargo/registry \
  --mount=type=cache,target=/usr/src/target cargo build \
  --release && strip -s target/release/pingplop && \
  mv target/release/pingplop .

# ------------------------------------------------------------------------------
# Use the slim image for a lean production container
# ------------------------------------------------------------------------------
FROM gcr.io/distroless/cc-debian12 as runner
LABEL org.opencontainers.image.source="https://github.com/pingplop/pingplop"
WORKDIR /app

ARG BASE_URL
ARG APP_SECRET
ARG DATABASE_URL
ARG DATABASE_TOKEN
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_SECURE
ARG SMTP_USERNAME
ARG SMTP_PASSWORD
ARG SMTP_MAIL_FROM

ENV BASE_URL $BASE_URL
ENV APP_SECRET $APP_SECRET
ENV DATABASE_URL $DATABASE_URL
ENV DATABASE_TOKEN $DATABASE_TOKEN
ENV SMTP_HOST $SMTP_HOST
ENV SMTP_PORT $SMTP_PORT
ENV SMTP_SECURE $SMTP_SECURE
ENV SMTP_USERNAME $SMTP_USERNAME
ENV SMTP_PASSWORD $SMTP_PASSWORD
ENV SMTP_MAIL_FROM $SMTP_MAIL_FROM

# Don't run production as root, spawns command as a child process.
COPY --from=builder /usr/bin/tini /usr/bin/tini
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

# Copy required application packages from builder step.
COPY --from=builder --chown=nonroot:nonroot /usr/src/data /app/data
COPY --from=builder --chown=nonroot:nonroot /usr/src/pingplop /app
# COPY --from=builder /tmp/sqld /usr/bin/

USER nonroot
EXPOSE 5080
# EXPOSE 8080

ENTRYPOINT ["/usr/bin/tini", "-s", "--"]
CMD ["/app/pingplop", "--port", "5080"]
