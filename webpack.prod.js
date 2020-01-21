const merge = require('webpack-merge');
const DataService = require('./data-service/dataService');

module.exports = async () => {
    const dataService = new DataService({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: "master"
    });

    // load data and configure webpackPlugins with it
    const films = await dataService.getFilms();
    const common = require('./webpack.common')({ films });

    return merge(common, {
        mode: 'development'
    })
}