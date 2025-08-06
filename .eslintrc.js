/* eslint-disable */
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    },
  },
  extends: [
    'materya',
    'materya/typescript',
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", '.vue'],
        paths: ['@types'],
      },
    },
  },
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'max-len': ['error', {
      code: 79,
      ignoreComments: true,
      ignoreTemplateLiterals: true,
      ignoreStrings: true,
      ignoreUrls: true,
    }],
    semi: ['error', 'never'],
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/named': 'off', // Does not work well with TS
    camelcase: ['off', { ignoreDestructuring: true }],
    'no-unused-expressions': ['off', { allowShortCircuit: true }],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
    'space-before-function-paren': ['off'],
    '@typescript-eslint/no-unused-vars': ['error', {
      varsIgnorePattern: '^\\\$',
    }],
    'object-curly-newline': ['error', {
      ObjectExpression: { consistent: true },
    }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'template-tag-spacing': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'dev' ? 'off' : 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [2, 'always-multiline'],
    'import/no-unresolved': ['error', {
      ignore: ['^@/@types/cresh-ui$', '^@', 'config'],
    }],
    'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      "multiline": {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false
      }
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': true,
      'ignores': [],
    }],
    'vue/html-indent': 'off',
    'vue/attributes-order': 'off',
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/no-reserved-component-names': ['error'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/require-name-property': ['error'],
    'vue/one-component-per-file': ['error'],
    'vue/custom-event-name-casing': ['error'],
    'vue/no-arrow-functions-in-watch': ['error'],
    'vue/no-custom-modifiers-on-v-model': ['error'],
    'vue/no-dupe-v-else-if': ['error'],
    'vue/no-multiple-template-root': ['off'],
    'no-undef': 'off', // @typescript-eslint/no-undef
    'no-param-reassign': ['error', { "props": false }],
    'no-shadow': 'off', // @typescript-eslint/no-shadow
    'vue/custom-event-name-casing': 'off',
    'no-nested-ternary': ['warn'],
    'vue/max-len': ['off'], // max-len exists
    'import/no-extraneous-dependencies':[
      'error',
      {
         'devDependencies':[
            '**/*.test.{js,ts,tsx}',
            '**/*.spec.{js,ts,tsx}',
            '**/cypress.config.{js,ts}',
            '**/cypress/**',
            '**/tests/**',
            '**/vite.config.{js,ts}',
            '**/vitest.config.{js,ts}',
            '**/*.cy.{js,ts,tsx}',
         ]
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/tests/unit/**/*.test.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ],
  ignorePatterns: [
    'src/pages/*', // pages for examples purposes only
    'cypress.config.ts',
  ]
}
