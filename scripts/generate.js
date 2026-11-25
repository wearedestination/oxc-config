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

await writeFile(new URL("../src/oxlintrc.json", import.meta.url), `${JSON.stringify(config, undefined, 4)}\n`);
