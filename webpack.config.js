// MODULES ====================================================================================================
//* Embedded modules
const path = require("path"); // connect embedded 'path' module

//* Plug-ins
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

// CONFIG ======================================================+++============================================
let conf = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    publicPath: "http://localhost:4200/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules",
      },
      {
        test: /\.module\.(css|s[ac]ss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[local]__[sha1:hash:hex:7]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /^((?!\.module).)*(css|s[ac]ss)$$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      inject: "head",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "public"),
    //       to: path.resolve(__dirname, "dist"),
    //     },
    //   ],
    // }),
    new ESLintPlugin(),
  ],
  devServer: {
    port: 4200,
    open: "chrome",
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "public"),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      containers: path.resolve(__dirname, "src/containers"),
      store: path.resolve(__dirname, "src/store"),
      routeMap: path.resolve(__dirname, "src/routeMap"),
      assets: path.resolve(__dirname, "src/assets"),
      public: path.resolve(__dirname, "public"),
      src: path.resolve(__dirname, "src"),
    },
  },
  devtool: isProd ? false : "eval-cheap-module-source-map", // Source-map creating
};

module.exports = conf;
