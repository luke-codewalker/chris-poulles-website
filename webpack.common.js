const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (content) => {
    // compile a list with all partial directory so they can be referenced via name
    const components = fs.readdirSync(path.resolve(__dirname, 'src/components')).map(componentName => path.join(__dirname, 'src', 'components', componentName))
    const partialDirs = [path.join(__dirname, 'src', 'layouts'), ...components]

    // return the final assembled config object
    return {
        entry: { index: [path.resolve(__dirname, 'src/index.js'), path.resolve(__dirname, 'src/index.scss')] },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
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
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.hbs'),
                filename: 'index.html',
                title: 'Chris Poulles Cinematographer',
                chunks: ['index'],
                data: content
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ]
    };
}