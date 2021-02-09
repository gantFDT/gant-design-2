const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    'consistent-return': 'off',
    'import/no-useless-path-segments': 'off',
    'no-unused-expressions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-throw-literal': 'off',
    'prefer-template': 'off',
    '@typescript-eslint/dot-notation': 'off',
    'no-bitwise': 'off',
    'radix': 'off',
    '@typescript-eslint/array-type': 'off',
    'eqeqeq': 'off',
    'no-multiple-empty-lines': 'error',
    'spaced-comment': 'off',
    'semi': ['error', 'always'],
    'quotes': 'error',
    'jsx-quotes': 'off',
    'func-names':'off'
  },
  plugins: [...fabric.default.plugins, 'react-hooks'],
  parserOptions: {
    ...fabric.default.parserOptions,
    project: './packages/**/tsconfig.json',
  },
};
