# Contributing Guideline

Please open an issue to discuss the contribution you wish to make before submitting any changes. This way we can guide you through the process and give feedback.

## 🏁 Quick Start

You will need `Go >=1.21.3`, `Node.js >=18.17.1`, `Docker >= 20.10`, and some toolchain installed on your machine.

### Up and Running

1. Install the required toolchain & SDK: [Go](https://go.dev/doc/install), [Node.js](https://nodejs.org/en/download), [sql-migrate][sql-migrate], [Docker][docker], and [Taskfile][taskfile].
2. Create `.env` file or copy from `.env.example`, then configure required variables.
3. Run project in development mode: `task dev`

Type `task --list-all` on your terminal and see the available commands.

### Generate Secret

You need to set the `JWT secret key` with some random string.
To generate a secret key, use the following command:

```sh
openssl rand -base64 500 | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
```

## 🐳 Docker Container

### Build Container

```sh
task docker-build
```

### Testing Container

```sh
task docker-run
```

### Push Images

Sign in to container registry:

```sh
echo $REGISTRY_TOKEN | docker login REGISTRY_URL --username YOUR_USERNAME --password-stdin
```

Replace `REGISTRY_URL` with your container registry, ie: `ghcr.io` or `docker.io`

Push docker image:

```sh
task docker-push
```

## 🧑🏻‍💻 Development

This project uses TypeScript for type checking, [eslint](https://eslint.org/) for linting,
and [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to get
TypeScript set up for your editor and install an editor plugin (like the [VSCode Prettier plugin](https://s.id/vscode-prettier))
to get auto-formatting on saving and get a really great in-editor experience with type checking
and auto-complete.

## 🚀 Deployment

Read [Deployment Guide](https://pingplop.mintlify.app/deployment) for detailed documentation.

## 🪪 Licensing

This project is GNU AGPL licensed. If you make a contribution, you agree to transfer ownership of your contribution to us.

[cobra]: https://cobra.dev/
[viper]: https://github.com/spf13/viper
[go-chi]: https://github.com/go-chi/chi
[docker]: https://docs.docker.com/engine/install/
[taskfile]: https://taskfile.dev/installation
[sql-migrate]: https://github.com/rubenv/sql-migrate
