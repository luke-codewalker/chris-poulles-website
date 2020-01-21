const merge = require('webpack-merge');
const DataService = require('./data-service/dataService');
const glob = require("glob");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async () => {
    const dataService = new DataService({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: "master"
    });

    // load data and configure webpackPlugins with it
    const films = await dataService.getFilms();
    const common = require('./webpack.common')({ films });

    return merge.smartStrategy({ 'module.rules.use': 'prepend' })(common, {
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader
                    ]
                }]
        },
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync(`${__dirname}/src/**/*.{hbs,js}`, { nodir: true }),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ]
    })
}