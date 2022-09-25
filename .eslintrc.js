module.exports = {
  extends: [
    '@antfu',
  ],
  rules: {
    'semi': 'off',
    '@typescript-eslint/semi': ['warn', 'always'],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
  },
};
