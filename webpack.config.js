const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");

function createChunksMpas() {
  let entry = {};
  let htmlPlugin = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  entryFiles.forEach((item) => {
    const match = item.match(/src\/(.*)\/index\.js/);
    const entryFile = match[1];
    entry[entryFile] = item;
    htmlPlugin.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, `./src/${entryFile}/index.html`),
        filename: `${entryFile}.html`,
        chunks: [entryFile],
      })
    );
  });
  return { entry, htmlPlugin };
}

const { entry, htmlPlugin } = createChunksMpas();

module.exports = {
  entry,
  output: {
    path: path.resolve("./build"),
    filename: "[name]-[chunkhash:5].js",
  },
  mode: "development",
  devtool: "sourcemap",
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
    ...htmlPlugin,
    new miniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: "./build",
    port: 9999,
    open: false,
    proxy: {
      "/api": {
        target: "http://localhost:9990",
      },
    },
  },
};
