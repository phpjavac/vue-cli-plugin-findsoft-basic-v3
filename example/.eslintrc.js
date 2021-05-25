module.exports = {
  root: true,
  env: {
    node: true,
  },
  // 使用prettier作为默认格式化工具
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', 'prettier', '@vue/typescript/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'linebreak-style': 'off' /**windows开发 */,
    'max-len': 'off',
    'no-param-reassign': 'off',
    'max-classes-per-file': 'off' /**允许一个文件存在多个类 */,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/interface-name-prefix': 'off', /** 禁用 ts 接口名限制（为什么要限制interface不能以I开头？） */
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
