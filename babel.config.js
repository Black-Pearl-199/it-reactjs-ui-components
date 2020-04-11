/* eslint-disable no-template-curly-in-string */
module.exports = {
    plugins: [
        [
            'transform-imports',
            {
                '@fortawesome/free-solid-svg-icons': {
                    transform: '@fortawesome/free-solid-svg-icons/${member}',
                    skipDefaultConversion: true,
                    preventFullImport: true
                },
                'react-bootstrap': {
                    transform: 'react-bootstrap/${member}',
                    preventFullImport: true
                },
                lodash: {
                    transform: 'lodash/${member}',
                    preventFullImport: true
                }

            }
        ]
    ],
    presets: [
        // WebPack handles ES6 --> Target Syntax
        ['@babel/preset-env', { modules: false, useBuiltIns: 'entry', corejs: 3 }]
    ]
};
