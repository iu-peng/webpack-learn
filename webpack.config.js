const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    fileB: "./src/demo.js",
    fileC: ["./src/a.js", "./src/demo.js"],
  },
  output: {
    path: path.resolve("./build"),
    filename: "[name]-[chunkhash:5].js",
  },
  mode: "development",
  resolveLoader: {
    modules: ["node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: ["custom-style-loader", "custom-css-loader", "custom-less-loader"],
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: "replace",
            options: {
              title: "卧槽",
            },
          },
          "async-replace",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "imgs",
            publicPath: "../imgs",
            limit: 1024 * 2,
          },
        },
      },
      {
        test: /\.(woff|ttf|svg|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts",
            publicPath: "../fonts",
          },
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "assets/index.html",
      filename: "main.html",
    }),
    new miniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
  ],
};
