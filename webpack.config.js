const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dataService = require("./data-service/dataService")

module.exports = async () => {
    // load data and configure htmlWebpackPlugins for every page with it
    const films = await dataService.getFilms();
    console.log(films);


    // compile a list with all partial directory so they can be referenced via name
    const components = fs.readdirSync('./src/components').map(componentName => path.join(__dirname, 'src', 'components', componentName))
    const partialDirs = [path.join(__dirname, 'src', 'layouts'), ...components]

    // return the final assembled config object
    return {
        mode: "development",
        entry: { index: ['./src/index.js', './src/index.scss'] },
        output: {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.hbs',
                filename: 'index.html',
                title: 'Chris Poulles Website',
                chunks: ['index'],
                data: { films }
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: '[id].css'
            })],
        module: {
            rules: [{
                test: /\.hbs$/,
                loader: "handlebars-loader",
                query: {
                    partialDirs
                }
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        }
    };
}