const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    main: "./src/js/entries/common.ts",
    lines: "./src/js/entries/lines.ts",
    auth: "./src/js/entries/auth.ts",
    section: "./src/js/entries/section.ts",
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /(\.css$)/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/js"),
    },
    modules: [path.join(__dirname, "src/js"), "node_modules"],
    extensions: [".js", ".ts", ".json"],
  },
  target: "node",
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public/index.html"),
      inject: false,
    }),
  ],
};
