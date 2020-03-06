const path = require("path");
const merge = require("webpack-merge");
const logPlugin = require("log-plugin");
const common = require("./mio.common");
const cwd = process.cwd();

const getDefaultConfig = env => {
  const dev = !!env.dev;
  const { config, output } = env;
  let extraConfig = config ? require(path.join(cwd, config)) : {};
  if (typeof extraConfig == "function") {
    extraConfig = extraConfig();
  }
  const defaultConfig = {
    mode: dev ? "development" : "production",
    devtool: dev ? "source-map" : "",
    output: {
      filename: "[name].js",
      path: output
        ? path.resolve(cwd, output)
        : path.resolve(__dirname, "../dist")
    },
    plugins: dev ? [new logPlugin({ showWords: true, showEvent: false })] : []
  };

  return merge(common, defaultConfig, extraConfig);
};

module.exports = getDefaultConfig;
