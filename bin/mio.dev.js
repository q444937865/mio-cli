const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./mio.common.js");
const logPlugin = require("log-plugin");
const path = require("path");

//merge.smart 会将相同的规则项合并
module.exports = merge(common, {
  devtool: "inline-source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    // 热更新，热更新不是刷新
    new webpack.HotModuleReplacementPlugin(),
    new logPlugin({ showWords: true, showEvent: false })
  ],
  devServer: {
    contentBase: "./dist",
    host: "localhost",
    port: 8080,          // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    noInfo: true
    // 代理
    // proxy: {
    //   "/api": "http://localhost:4000"
    // }
  },
  mode: 'development'
});
