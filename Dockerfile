# syntax=docker/dockerfile:1.4

# Arguments with default value (for build).
ARG GO_VERSION=1.21
ARG BUILD_VERSION 0.0.0

# -----------------------------------------------------------------------------
# Build the application binaries
# -----------------------------------------------------------------------------
FROM golang:${GO_VERSION}-alpine as builder
WORKDIR /app

ENV CGO_ENABLED 0
ENV BUILD_VERSION $BUILD_VERSION
ENV BUILD_DATE $BUILD_DATE
ENV LDFLAG_PREFIX "github.com/pingplop/pingplop/meta"

COPY . .
RUN --mount=type=cache,id=go,target=/go/pkg/mod --mount=type=cache,id=go,target=/root/.cache/go-build \
  go mod download && go mod tidy

# BUILD_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
RUN --mount=type=cache,id=go,target=/go/pkg/mod --mount=type=cache,id=go,target=/root/.cache/go-build go build \
  --ldflags="-w -s -extldflags '-static' -X ${LDFLAG_PREFIX}.Version=${BUILD_VERSION} -X ${LDFLAG_PREFIX}.BuildDate=${BUILD_DATE}" \
  -trimpath -a -o pingplop cmd/app/main.go

# -----------------------------------------------------------------------------
# Use the slim image for a lean production container.
# -----------------------------------------------------------------------------
FROM alpine:3.18 as runner
LABEL org.opencontainers.image.source="https://github.com/pingplop/pingplop"

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

# Don't run production as root, spawns command as a child process.
RUN addgroup --system --gid 1001 nonroot && adduser --system --uid 1001 nonroot
RUN apk update && apk add --no-cache tini ca-certificates
RUN mkdir -p /appdata && chown -R nonroot:nonroot /appdata

COPY --from=builder --chown=nonroot:nonroot /app/pingplop /usr/bin/pingplop

USER nonroot
EXPOSE 3080

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/bin/pingplop", "--address", "0.0.0.0:3080"]
