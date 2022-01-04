module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules/', 'reportWebVitals.js'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/prop-types': ['off'],
    'no-unused-vars': 'warn',
    'prefer-template': 'off',
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'object-shorthand': 'off',
    'no-underscore-dangle': 'off',
  },
};
