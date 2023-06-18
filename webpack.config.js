const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log("path");
console.log(path.resolve(__dirname, "assets", "js"));

module.exports = {
  entry: "./src/client/js/main.js",
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  watch: true,
  output: {
    filename: "js/main.js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        // use: [
        //   { loader: "style-loader" },
        //   { loader: "css-loader" },
        //   { loader: "sass-loader" },
        // ],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
