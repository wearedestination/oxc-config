# Contributing

## Development

```console
npm ci
npm run generate
npm run check
```

`src/oxlintrc.json` is generated from `@destination/eslint-config` by `scripts/generate.js`. Don't edit it by hand:
change the rules in `@destination/eslint-config`, bump it here, and run `npm run generate`. CI fails if the committed
file doesn't match what the generator produces.

The Oxfmt config in `src/oxfmt.js` is written by hand.

## Pull requests

- Commit `src/oxlintrc.json` with any change that regenerates it.
- Update the README when the config or how to use it changes.
- CI runs the generator and the check on every pull request, so run them locally first.
- You're the author of every commit in your pull request, however it was written. Don't add `Co-Authored-By`
  trailers or other credit for AI tools.

## Releasing

Bump `version` in `package.json`, commit, and push a matching `v<version>` tag. The publish workflow checks the
package and publishes it to npm through trusted publishing (GitHub OIDC), so it needs no token.
