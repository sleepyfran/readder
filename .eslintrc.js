module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['warn', 4],
        semi: ['error', 'never'],
        quotes: [2, 'single', 'avoid-escape']
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
