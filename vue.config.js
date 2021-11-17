const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //     ? '/wedevsFrontend/'
  //     : '/',
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "Wedevs Assignment";
      return args;
    });
  },
  // devServer: {
  //   proxy: 'https://jubayerahmed.com/wedevsBackend/',
  // }
};
