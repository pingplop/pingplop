# Deployment to Fly.io

## Create app instances

```sh
fly apps create pingplop-demo -o pingplop
```

## Launch and deploy

```sh
# Load secrets from dotenv file then initialize deployment
fly secrets set $(cat .env | xargs -I %s echo %s)

# Deploy the app
fly deploy --remote-only
```

## Setup custom domain

Point DNS A Record to the assigned IP address.
Or, if using subdomain you can point `pingplop-demo.fly.dev` CNAME record.

```sh
# Allocate IPs and setup custom domain (optional)
fly ips allocate-v4 -a pingplop
fly ips allocate-v6 -a pingplop
fly certs create api.pingplop.com -a pingplop
```
