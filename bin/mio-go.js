#!/usr/bin/env node

const path = require("path");
const program = require("commander");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const merge = require("webpack-merge");
const devServerConfig = require("./mio.dev");

const runWebpackDevServer = program => {
  let runConfig = devServerConfig;
  if (program.config) {
    const userConfig = require(path.resolve("./", program.config));
    const newConfig = typeof userConfig == "function" ? userConfig() : userConfig;
    runConfig = merge.smart(devServerConfig, newConfig);
  }
  if (program.entry) {
    runConfig = merge.smart(runConfig, { entry: { mio: program.entry } });
  }
  const compiler = webpack(runConfig);
  const server = new webpackDevServer(compiler, { open: true, noInfo: true });
  server.listen(
    runConfig.devServer.port,
    runConfig.devServer.host,
    (err, stats) => {
      hasErr(err, stats);
    } // 成功回调
  );
};

const hasErr = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    return;
  }
};

const mio = program => {
  runWebpackDevServer(program);
};

program
  .option("-c, --config <path>", "set webpack config, defaults ~/mio.dev.js")
  .option("-e, --entry <path>", "set entry path, defaults ~/src/index.js")
  .parse(process.argv);

mio(program);
