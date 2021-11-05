module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
      "prettier/prettier": "error",
      "class-methods-use-this": "off",
      "no-useless-constructor": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/camelcase": "off",
      "no-unused-expressions": "off",
      "prefer-destructuring": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "_"
        }
      ],
      "@typescript-eslint/interface-name-prefix": [
        "error",
        {
          "prefixWithI": "always"
        }
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "ts": "never"
        }
      ]
    },
    "settings": {
      "import/resolver": {
        "typescript": {}
      }
    }
};
