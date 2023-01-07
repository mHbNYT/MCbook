module.exports = {
  extends: [
    "airbnb-typescript",
  ],
  rules: {
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
    "no-nested-ternary": 0,
    "import/prefer-default-export": 0,
    "react/destructuring-assignment": 0,
    "@typescript-eslint/quotes": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-bitwise": 0,
  },
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
};
