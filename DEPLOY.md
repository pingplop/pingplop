# Deployment to Fly.io

## Create app instances

```sh
# Create Fly.io app
fly apps create pingplop

# Create volume for the data.
fly postgres create --name pingplop-db --region sjc --password $(openssl rand -hex 8)
```

## Launch and deploy

```sh
# Attach Postgres database
fly postgres attach pingplop-db -a pingplop

# Load secrets from dotenv file then initialize deployment
fly secrets set $(cat .env | xargs -I %s echo %s)
fly secrets list

# Deploy the app
fly deploy --remote-only
```

## Setup custom domain

Point DNS A Record to the assigned IP address.
Or, if using subdomain you can point `pingplop.fly.dev` CNAME record.

```sh
# Allocate IPs and setup custom domain (optional)
fly ips allocate-v4 -a pingplop
fly ips allocate-v6 -a pingplop
fly certs create api.example.com -a pingplop
```
