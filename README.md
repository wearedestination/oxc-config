# Destination Oxc Config

Shared config for [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) and
[Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) that enforces our JS/TS coding standards.

The Oxlint rules are generated from [`@destination/eslint-config`](https://github.com/wearedestination/eslint-config),
so both packages enforce the same rules wherever Oxlint supports them. Oxlint doesn't support every rule in that
config, most of them from `eslint-plugin-unicorn`. Run `npx @oxlint/migrate --details` against the ESLint config to
list them.

Oxlint lints only the `<script>` blocks of Vue single-file components, not their templates, so Vue projects should
keep using [`@destination/eslint-config-vue`](https://github.com/wearedestination/eslint-config-vue). They can still
use the Oxfmt config.

## Installation

Install the tools you want alongside the config:

```console
npm install @destination/oxc-config oxlint oxlint-tsgolint oxfmt --save-dev
```

`oxlint-tsgolint` runs the type-aware rules, such as `typescript/no-floating-promises`, and needs a `tsconfig.json`.

## Usage

### Oxlint

Your `oxlint.config.ts` file should look something like this:

```ts
import destination from "@destination/oxc-config/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({ extends: [destination] });
```

Or, if you need to specify additional configuration:

```ts
import destination from "@destination/oxc-config/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [destination],
  ignorePatterns: ["assets/some-ignored-file.ts"],
  globals: {
    google: "readonly",
  },
});
```

### Oxfmt

Your `oxfmt.config.ts` file should look something like this:

```ts
import destination from "@destination/oxc-config/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({ ...destination });
```

Oxfmt has no `extends`, so override options by setting them after the spread.

The config matches [`@destination/prettier-config`](https://github.com/wearedestination/prettier-config) (4-space
indentation, 120-character lines) and sorts imports into the groups `@destination/eslint-config` enforces with
`import-x/order`. Oxfmt doesn't format Twig, so projects with Twig templates still need Prettier and
`@destination/prettier-plugin-twig` for those.

### Running

```console
npx oxlint
npx oxfmt
```

Both config files are TypeScript, which needs Node.js 22.18.0 or later.

## License

Released under the [MIT license](LICENSE)
