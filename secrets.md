# Secrets
## Create secrets for cdn service
```
kubectl \
  create secret generic cdn-secret \
  --from-literal="GITHUB_TOKEN=<YOUR-GITHUB-TOKEN>"
```
