const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dataService = require("./data-service/dataService")

module.exports = async () => {
    // load data and configure htmlWebpackPlugins for every page with it
    const films = await dataService.getFilms();
    if (process.env.NODE_ENV !== "production") {
        fs.writeFileSync(path.resolve(__dirname, "data-service", "films.dump.json"), JSON.stringify(films))
    }

    // compile a list with all partial directory so they can be referenced via name
    const components = fs.readdirSync(path.resolve(__dirname, 'src/components')).map(componentName => path.join(__dirname, 'src', 'components', componentName))
    const partialDirs = [path.join(__dirname, 'src', 'layouts'), ...components]

    // return the final assembled config object
    return {
        mode: process.env.NODE_ENV === "production" ? "production" : "development",
        entry: { index: [path.resolve(__dirname, 'src/index.js'), path.resolve(__dirname, 'src/index.scss')] },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.hbs'),
                filename: 'index.html',
                title: 'Chris Poulles Cinematographer',
                chunks: ['index'],
                data: { films }
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })],
        module: {
            rules: [{
                test: /\.hbs$/,
                loader: "handlebars-loader",
                query: {
                    partialDirs,
                    helperDirs: [path.resolve(__dirname, 'src/helpers')]
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    process.env.NODE_ENV === 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(eot|ttf|woff2?)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash:5].[ext]'
                },
            }
        ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            host: '0.0.0.0',
            port: 9000,
            historyApiFallback: true
        }
    };
}