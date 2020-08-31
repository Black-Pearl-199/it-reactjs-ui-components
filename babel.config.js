/* eslint-disable no-template-curly-in-string */
module.exports = {
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ],
    presets: [
        // WebPack handles ES6 --> Target Syntax
        ['@babel/preset-env', { modules: false, useBuiltIns: 'entry', corejs: 3 }],
        '@babel/preset-react'
    ]
};
