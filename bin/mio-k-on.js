#!/usr/bin/env node

const program = require("commander");
const webpack = require("webpack");
const config = require("./mio.prod");

const runWebpackDevServer = program => {
  let proConfig = config(program);
  if (program.watch) {
    webpack(proConfig).watch({}, () => {});
  } else {
    webpack(proConfig).run((err, stats) => {
      hasErr(err, stats);
      console.log("\n build success.");
    });
  }
};
const hasErr = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    return;
  }
  const info = stats.toJson();
  if (stats.hasErrors()) console.error(info.errors);
  if (stats.hasWarnings()) console.warn(info.warnings);
};

const mio = program => {
  runWebpackDevServer(program);
};

program
  .option("-c, --config <path>", "set config path. defaults to ~/mio.prod.js")
  .option("-w, --watch", "turn on watch mode")
  // .option("-t, --isTypeScriptBuild", "for watching build of memo")
  .option("-d, --dev", "mode, development || production (default)")
  .option("-o, --output <path>", "output path of webpack, like ./dist")
  .parse(process.argv);

mio(program);
