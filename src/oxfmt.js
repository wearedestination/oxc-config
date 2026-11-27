export default {
  printWidth: 120,
  tabWidth: 2,
  astro: true,
  sortImports: {
    groups: ["builtin", "external", ["internal", "subpath"], "parent", "sibling", "index", "style", "unknown"],
    newlinesBetween: false,
  },
};
