const merge = require('webpack-merge');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DataService = require('./data-service/dataService');
const commonWebpackConfig = require('./webpack.common');

module.exports = async () => {
  const dataService = new DataService({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: 'master',
  });

  // Load data and configure webpackPlugins with it
  const films = await dataService.getFilms();
  const about = await dataService.getAbout();
  const metaInfo = await dataService.getMetaInfo();
  const common = await commonWebpackConfig({ films, about, metaInfo });

  return merge.mergeWithRules({ module: { rules: { use: 'prepend' } } })(common, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
          ],
        }],
    },
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync(`${__dirname}/src/**/*.{hbs,js}`, { nodir: true }),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  });
};
