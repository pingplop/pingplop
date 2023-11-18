<img src="./static/favicon.svg" alt="Pingplop Logo" width="26" />

# Pingplop

[![CI Actions](https://github.com/pingplop/pingplop/actions/workflows/ci-actions.yml/badge.svg)](https://github.com/pingplop/pingplop/actions/workflows/ci-actions.yml)
[![Contributions](https://img.shields.io/badge/Contributions-welcome-blue.svg?color=orange)](https://github.com/pingplop/pingplop/graphs/contributors)
[![License](https://img.shields.io/github/license/pingplop/pingplop?color=informational)](https://github.com/pingplop/pingplop/blob/master/LICENSE)
[![Go Report Card](https://goreportcard.com/badge/github.com/pingplop/pingplop)](https://goreportcard.com/report/github.com/pingplop/pingplop)
[![Go Reference](https://pkg.go.dev/badge/github.com/pingplop/pingplop?status.svg)](https://pkg.go.dev/github.com/pingplop/pingplop)
[![Twitter Badge](https://img.shields.io/badge/-@riipandi-1ca0f1?style=flat&labelColor=gray&logo=x&logoColor=white&link=https://twitter.com/riipandi)](https://twitter.com/riipandi)

This is the open-source core of [Pingplop][pingplop-site], a server and website uptime monitoring solution.
Pingplop is made in 🇮🇩 and hosted on multiple regions at [Fly.io][fly-regions].You can find an interactive
demo of what the status page looks like [here][pingplop-demo].

## How does it work?

Site monitoring involves regularly checking a website's availability, performance, and functionality.
Pingplop send periodic requests to verify uptime, measure page load times, and detect errors or security
issues. Content monitoring ensures critical information is intact, and alerting systems notify administrators
of any breaches or anomalies. Historical data analysis enables trend identification and informed
decision-making to enhance overall website reliability.

The goal is to proactively address issues, preventing downtime and optimizing the user experience for visitors.

[Learn more about privacy on our documentation.][pingplop-docs]

## Documentation

You can find our documentation [here][pingplop-docs]. The code reference can be found on [go.dev][pingplop-godev].

## Contributions

Contributions are welcome! Please open a pull requests for your changes and tickets in case you would like to discuss something or have a question.

Note that we only accept pull requests if you transfer the ownership of your contribution to us. As we also offer a managed commercial solution with this library at its core, we want to make sure we can keep control over the source code.

## License

This project is open-sourced software licensed under the [GNU Affero General Public License v3.0][agpl-license].

Copyrights in this project are retained by their contributors.
See the [license file](./LICENSE) for more information.

---

<sub>🤫 Psst! You can [support my work here](https://github.com/sponsors/riipandi).</sub>

[pingplop-site]: https://github.com/pingplop
[pingplop-docs]: https://pingplop.mintlify.app/introduction
[pingplop-demo]: https://pingplop-demo.fly.dev/
[pingplop-godev]: https://pkg.go.dev/github.com/pingplop/pingplop
[fly-regions]: https://fly.io/docs/reference/regions/
[agpl-license]: https://choosealicense.com/licenses/agpl-3.0/
