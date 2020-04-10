module.exports = {
    plugins: [
        [
            'transform-imports',
            {
                '@fortawesome/free-solid-svg-icons': {
                    transform: '@fortawesome/free-solid-svg-icons/${member}',
                    skipDefaultConversion: true
                }
            }
        ]
    ],
    presets: [
        // WebPack handles ES6 --> Target Syntax
        ['@babel/preset-env', { modules: false, useBuiltIns: 'entry', corejs: 3 }]
    ]
};
