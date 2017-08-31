module.exports = {
  plugins: ["react", "prettier"],
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier/react"],
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  }
};
