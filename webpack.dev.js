const merge = require('webpack-merge');
const dotenv = require('dotenv');
const path = require('path');
const DataService = require("./data-service/dataService");

module.exports = async () => {
    // manually load config into process env
    dotenv.config();
    const dataService = new DataService({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: "master"
    });

    // load data and configure webpack with it
    const films = await dataService.getFilms({ shouldDumpData: true });
    const about = await dataService.getAbout({ shouldDumpData: true });
    const metaInfo = await dataService.getMetaInfo({ shouldDumpData: true });
    const common = require('./webpack.common')({ films, about, metaInfo });

    return merge.smartStrategy({ 'module.rules.use': 'prepend' })(common, {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader'
                    ]
                }]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            host: '0.0.0.0',
            port: 9000,
            historyApiFallback: true,
            overlay: true
        }
    })
}