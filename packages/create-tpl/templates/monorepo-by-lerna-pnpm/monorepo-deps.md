# monorepo lerna pnpm

## deps

```bash
pnpm i nx lerna -Dw
```

## package.json

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm",
    "dev": "lerna run dev --ignore=docs",
    "build": "lerna run build --ignore=docs",
    "release:alpha": "npm run release -- --canary --force-publish",
    "release:beta": "release:alpha -- --preid beta",
    "release": "lerna publish --no-private --registry=https://registry.npmjs.org/",
    "test": "lerna run test"
  }
}
```
