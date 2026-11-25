import { defineConfig } from "oxlint";
import destination from "./src/oxlint.js";

export default defineConfig({ extends: [destination] });
