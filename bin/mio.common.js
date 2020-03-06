const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    mio: "./src/index.js"
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Production",
      template: "./src/index.html",
      favicon: path.resolve("mio.ico")
    })
  ],
  module: {
    rules: [{
        test: /.(js|jsx)$/,
        // include: [path.resolve(__dirname, '../src')],
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          presets: [
            [ '@babel/preset-env', { modules: false } ]
          ]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/, // 解析css
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
    ]
  }
};
