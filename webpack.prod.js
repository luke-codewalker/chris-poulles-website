const merge = require('webpack-merge');
const DataService = require('./data-service/dataService');
const glob = require("glob");
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = async () => {
    // TODO: remove before merge, only for local debugging
    require("dotenv").config();
    const dataService = new DataService({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: "master"
    });

    // load data and configure webpackPlugins with it
    const films = await dataService.getFilms();
    const common = require('./webpack.common')({ films });

    return merge(common, {
        mode: 'development',
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync(`${__dirname}/src/**/*.{hbs,js}` , { nodir: true })
            })
        ]
    })
}