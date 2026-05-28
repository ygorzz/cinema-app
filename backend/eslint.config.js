import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: {
      ...globals.browser,
      ...globals.node
    }},
    rules: {
      // "error" -> considerada e exibida como um erro no terminal/editor
      // além dessa opção há tbm "warn"(apenas um alerta) e "off"(regra é desconsiderada)
      "indent": ["error", 2],
      "linebreak-style": ["error", "windows"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    } 
  },
]);
