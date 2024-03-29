const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async (content) => {
  // Compile a list with all partial directory so they can be referenced via name
  const componentNames = await new Promise((resolve, reject) => {
    fs.readdir(
      path.resolve(__dirname, 'src/components'),
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      },
    );
  });

  const componentPaths = componentNames.map((componentName) => path.join(__dirname, 'src', 'components', componentName));
  const partialDirs = [
    path.join(__dirname, 'src', 'layouts'),
    ...componentPaths,
  ];

  // Return the final assembled config object
  return {
    entry: {
      index: [path.resolve(__dirname, 'src/index.js'),
      path.resolve(__dirname, 'src/index.scss')],
    },
    resolve: {
      alias: {
        styles: path.resolve(__dirname, 'src', 'styles'),
      },
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [{
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs,
          helperDirs: [path.resolve(__dirname, 'src/helpers')],
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(eot|ttf|woff2?|otf)$/i,
        type: 'asset/resource',
      },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.hbs'),
        filename: 'index.html',
        title: 'Chris Poulles Cinematographer',
        chunks: ['index'],
        data: content,
      }),
    ],
  };
};
