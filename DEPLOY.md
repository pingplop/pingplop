# Deployment

```sh
cat fly.example.toml > fly-logto.stg.toml
sed -i -e "s/CHANGEME_APP_NAME/pingplop-demo/g" fly.toml

fly apps create --name pingplop-demo -o pingplop
fly secrets set ...........
fly deploy --remote-only
fly logs
```
