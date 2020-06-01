module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'react-app',
        'plugin:react-hooks/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        "comma-dangle": ["error", "never"],
        "import/prefer-default-export": "warn",
        "indent": ["warn", 4, {"SwitchCase": 1}],
        "linebreak-style": "off",
        "max-len": "off",
        "no-case-declarations": "off",
        "no-shadow": "off",
        "no-restricted-globals": "off",
        "no-use-before-define": "off",
        "object-curly-newline": "off",
        "object-curly-spacing": ["error", "always"],
        "semi": ["warn", "always"],

        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/no-static-element-interactions": "off",

        "react/button-has-type": "off",
        "react/default-props-match-prop-types": ["error", { "allowRequiredDefaults": true }],
        "react/destructuring-assignment": "off",
        "react/forbid-prop-types": ["error", { "forbid": [], "checkContextTypes": true, "checkChildContextTypes": true }],
        "react/jsx-closing-bracket-location": "off",
        "react/jsx-indent": ["warn", 4],
        "react/jsx-indent-props": ["warn", 4],
        "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
        "react/jsx-no-target-blank": ["error", { "enforceDynamicLinks": "never" }],
        "react/jsx-props-no-spreading": "off",
        "react/no-access-state-in-setstate": "off",
        "react/no-array-index-key": "off",
        "react/no-danger": "off",
        "react/no-unused-prop-types": "warn",
        "react/no-unused-state": "warn",
        "react/prop-types": ["warn", { ignore: ['children', 'className', 'classes'] }],
        "react/require-default-props": "off",
        "react/sort-comp": "off",
        "react/state-in-constructor": "off",
        "react/static-property-placement": ["warn", "static public field"]
    }
};
