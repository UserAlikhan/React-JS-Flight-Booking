const path = require('path');
const webpack = require('webpack');

module.exports = {
    // Ваши существующие настройки...

    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "fs": require.resolve("fs"),
            "http": require.resolve("stream-http")
        }
    },

    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};