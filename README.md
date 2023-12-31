<img src="./crates/server/static/favicon.svg" alt="Pingplop Logo" width="26" />

# Pingplop

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/pingplop/pingplop?logo=rust)](https://github.com/pingplop/pingplop/releases)
[![(Rust)](https://img.shields.io/badge/rust-v1.75-orange.svg?logo=rust)](https://www.rust-lang.org/)
[![Dependencies](https://deps.rs/repo/github/pingplop/pingplop/status.svg)](https://deps.rs/repo/github/pingplop/pingplop)
[![CI Test](https://github.com/pingplop/pingplop/actions/workflows/ci-test.yml/badge.svg)](https://github.com/pingplop/pingplop/actions/workflows/ci-test.yml)
[![CI Build](https://github.com/pingplop/pingplop/actions/workflows/ci-build.yml/badge.svg)](https://github.com/pingplop/pingplop/actions/workflows/ci-build.yml)
[![Contribution welcome](https://img.shields.io/badge/Contributions-welcome-gray.svg)](https://github.com/pingplop/pingplop/graphs/contributors)

---

This is the open-source core of [Pingplop][pingplop-site], a lightweight infrastructure monitoring platform.

> [!WARNING]
> Pingplop is currently in development so bugs may be present.
> <br/> Breaking changes can happen, use at your own risk!

Curious what the status page looks like? [See status page in action][pingplop-status].

## How does it work?

Site monitoring involves regularly checking a website's availability, performance, and functionality.
Pingplop send periodic requests to verify uptime, measure page load times, and detect errors or security
issues. Content monitoring ensures critical information is intact, and alerting systems notify administrators
of any breaches or anomalies. Historical data analysis enables trend identification and informed
decision-making to enhance overall website reliability.

The goal is to proactively address issues, preventing downtime and optimizing the user experience for visitors.

[Learn more about Pingplop on our documentation.][pingplop-docs]

## Getting Started

You can find our documentation [here][pingplop-docs].

## Progress

I'm building the lightweight, portable, and easy-to-use site monitoring tool for developers, freelancer,
webmaster, agency, and enterprises, all on my own. I'd love for you to jump into the discussions about
our upcoming features. Your input is super valuable! 🚀

| Feature              | What it does             | Status |
| -------------------- | ------------------------ | ------ |
| Cloud SaaS           | ....                     | ✅     |
| Self-hosting         | ....                     | ✅     |
| Container + libsql   | ....                     | 🕝     |
| Container standalone | ....                     | ✅     |
| ...                  | more description here... | 🕝     |

## Self-host

I offer official [Pingplop docker image][pingplop-docker] that enables you to effortlessly self-host the platform.
You have the flexibility to host Pingplop across multiple regions on [Fly.io](https://fly.io) or any other cloud
providers of your choice.

For detailed instructions, please read the [documentation page][pingplop-docs].

## Contributions

Contributions are welcome! Please open a pull requests for your changes and tickets in case you would like to discuss something or have a question.

Note that we only accept pull requests if you transfer the ownership of your contribution to us. As we also offer a managed commercial solution with this library at its core, we want to make sure we can keep control over the source code.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed documentation.

## License

This project is open-sourced software licensed under the [GNU Affero General Public License v3.0][agpl-license].

Copyrights in this project are retained by their contributors.
See the [license file](./LICENSE) for more information.

---

<sub>🤫 Psst! If you like my work you can support me via [GitHub sponsors](https://github.com/sponsors/riipandi).</sub>

[![Made by](https://badgen.net/badge/icon/Made%20by%20Aris%20Ripandi?icon=bitcoin-lightning&label&color=black&labelColor=black)][riipandi-twitter]

[pingplop-site]: https://pingplop.com/?ref=github
[pingplop-docs]: https://docs.pingplop.com/introduction
[pingplop-docker]: https://github.com/pingplop/pingplop/pkgs/container/pingplop
[pingplop-status]: https://status.pingplop.com/
[fly-regions]: https://fly.io/docs/reference/regions/
[agpl-license]: https://choosealicense.com/licenses/agpl-3.0/
[riipandi-twitter]: https://twitter.com/intent/follow?original_referer=https://ripandis.com&screen_name=riipandi
