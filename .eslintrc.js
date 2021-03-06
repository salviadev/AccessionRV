module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // ...
        project: "./tsconfig.eslint.json",
        // ...
      },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        "@typescript-eslint/no-unused-vars": "off",
        "semi-style": ["error", "last"],
        "semi": ["error", "always"],
        "no-useless-escape": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "no-case-declarations": "off",
        "no-constant-condition": "off",
        "no-prototype-builtins": "off",
        '@typescript-eslint/no-floating-promises': 'error'
        
        /*
        '@typescript-eslint/no-unused-vars': ['error', { 'args': 'none' }],
        */
    }
};