const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,

  entry: './src/main.ts',

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],

  output: {
    path: resolve(__dirname, '../backend/static'),
  },

  resolve: {
    extensions: ['.ts', '.js'],
    aliasFields: ['browser'],
    alias: {
      "@": resolve(__dirname, 'src'),
    },
  },

  target: "web",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              allowTsInNodeModules: true
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
      },
    ],
  },

  devServer: {
    contentBase: './public',
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },

}
