// Generates src/oxlintrc.json from @destination/eslint-config, which stays the
// source of truth for the rule set. CI regenerates the file and fails if it
// differs from the committed copy.
import { writeFile } from "node:fs/promises";
import destinationEslintConfig from "@destination/eslint-config";
import migrate from "@oxlint/migrate";

const config = await migrate(destinationEslintConfig, undefined, {
  typeAware: true,
});

// Oxlint resolves imports itself, so the import-x resolver settings carried
// over from ESLint mean nothing to it.
delete config.$schema;
delete config.settings;

// Astro frontmatter is a module body that can `return` early, such as
// `return Astro.rewrite("/404")`. ESLint doesn't lint .astro files, so this has
// no counterpart in @destination/eslint-config.
config.overrides = [
  ...(config.overrides ?? []),
  {
    files: ["**/*.astro"],
    rules: { "unicorn/prefer-module": "off" },
  },
];

await writeFile(new URL("../src/oxlintrc.json", import.meta.url), `${JSON.stringify(config, undefined, 4)}\n`);
