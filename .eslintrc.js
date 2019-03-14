module.exports = {
    extends: ["airbnb-base", "prettier"],
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
      "no-use-before-define": ["error", { "functions": false, "classes": true }],
      camelcase: 0
    }
}