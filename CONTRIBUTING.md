# Contributing Guideline

Please open an issue to discuss the contribution you wish to make before submitting any changes. This way we can guide you through the process and give feedback.

## 🏁 Quick Start

You will need `Rust >=1.75` and `Docker >= 20.10` installed on your machine.

### Up and Running

1. Install the required toolchain & SDK: [Rust][install-rust], [Docker][docker], and [cargo-watch][cargo-watch].
2. Create `.env` file or copy from `.env.example`, then configure required variables.
3. Generate application secret key, use [Generate Secret](#generate-secret) command.
4. Run database migration and create default user: `cargo run -q -- migrate --create-admin`
5. Run project in development mode: `cargo run`

Type `cargo --help` on your terminal and see the available `cargo` commands.

### Generate Secret

You need to set the `secret key` with a random string. Use built-in command to generate a secret key:

```sh
cargo run -q -- secret-key
```

### Auto Reload

Whenever the source code changes, the app is recompiled and restarted.

Optionally you can pass additional args to the server, example:

```sh
cargo watch -cx 'run -- --address 127.0.0.1'
```

That command equivalent to: `pingplop --address 127.0.0.1` in release build.

## 🔰 Database Migration

This project does not use an ORM, we use [libsql-client][libsql-client] to interact
with the Database.

> TODO: add more information here

## 🐳 Docker Container

### Development Server

```sh
# Start development server
docker-compose -f docker-compose.yml up -d

# Stop development server
docker-compose -f docker-compose.yml down --remove-orphans
```

### Build Container

```sh
docker build -f Dockerfile . -t pingplop

docker image list | grep pingplop
```

### Testing Container

```sh
docker run --rm -it -p 3080:3080 --env-file .env.docker --name pingplop pingplop
```

### Push Images

Sign in to container registry:

```sh
echo $REGISTRY_TOKEN | docker login ghcr.io --username YOUR_USERNAME --password-stdin
```

Push docker image:

```sh
docker push ghcr.io/pingplop/pingplop:latest
```

## 🚀 Deployment

Read [Deployment Guide](https://docs.pingplop.com/deployment) for detailed documentation.

## 🪪 Licensing

This project is GNU AGPL licensed. If you make a contribution, you agree to transfer ownership of your contribution to us.

[docker]: https://docs.docker.com/engine/install
[libsql-client]: https://docs.turso.tech/libsql/client-access/rust-sdk
[install-rust]: https://www.rust-lang.org/tools/install
[cargo-watch]: https://github.com/watchexec/cargo-watch
