# Contributing

## Development

```console
npm ci
npm run generate
npm run check
npm test
```

`src/oxlintrc.json` is generated from `@destination/eslint-config` by `scripts/generate.js`. Don't edit it by hand:
change the rules in `@destination/eslint-config`, bump it here, and run `npm run generate`. CI fails if the committed
file doesn't match what the generator produces.

Overrides that only this package applies, such as those for `.astro` files, which ESLint doesn't lint, and for Sanity
schemas, are added in `scripts/generate.js` after the migration.

The Oxfmt config in `src/oxfmt.js` is written by hand.

`npm test` checks that the files in `test/fixtures` are formatted with the shared Oxfmt config and pass the shared
Oxlint config. The `test` script names each fixture, so it fails if the config stops formatting that file type, where a
whole-repo check would skip it. Add a fixture when the config takes on a new file type and list it in the script. Run
`npx oxfmt test/fixtures` after changing the config.

## Pull requests

- Commit `src/oxlintrc.json` with any change that regenerates it.
- Update the README when the config or how to use it changes.
- CI runs the generator and the check on every pull request, so run them locally first.
- You're the author of every commit in your pull request, however it was written. Don't add `Co-Authored-By`
  trailers or other credit for AI tools.

## Releasing

Bump `version` in `package.json`, commit, and push a matching `v<version>` tag. The publish workflow checks the
package and publishes it to npm through trusted publishing (GitHub OIDC), so it needs no token.
