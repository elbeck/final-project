// MODULES ====================================================================================================
//* Embedded modules
const path = require("path"); // connect embedded 'path' module

//* Plug-ins
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

// CONSTANTS  ======================================================+++========================================
const isProd = process.env.NODE_ENV === "production";
const PORT = 4200;

// CONFIG ======================================================+++============================================
let conf = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    publicPath: `http://localhost:${PORT}/`,
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
    new ESLintPlugin(),
  ],
  devServer: {
    port: PORT,
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
      src: path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
      store: path.resolve(__dirname, "src/store"),
      api: path.resolve(__dirname, "src/api"),
      helpers: path.resolve(__dirname, "src/helpers"),
      "route-map": path.resolve(__dirname, "src/route-map"),
    },
  },
  devtool: isProd ? false : "eval-cheap-module-source-map",
};

module.exports = conf;
