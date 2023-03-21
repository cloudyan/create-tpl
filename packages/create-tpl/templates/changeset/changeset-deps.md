# changesets

## deps

```bash
pnpm i @changesets/cli husky -Dw
```

## package.json

```json
{
  "scripts": {
    "version": "changeset && changeset version",
    "version:next": "changeset pre enter next",
    "version:end": "changeset pre exit",
    "release": "npm run build && changeset publish",
    "build": "turbo publish",
    "prepare": "husky install",
    "pub": "turbo publish"
  }
}
```
