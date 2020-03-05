#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const download = require("download-git-repo");
const inquirer = require("inquirer");

const spinner = ora("Download...");

const startDown = answers => {
  spinner.start();
  const { name, type } = answers;
  download(
    // "direct:https://github.com:q444937865/react-zz.git#master",
    "q444937865/react-zz",
    name,
    // { clone: true },
    err => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(` download failed. ${err}`));
        return;
      }

      spinner.succeed();
      console.log(chalk.green("\n download completed!"));
      console.log(chalk.green("\n    have fun ~"));
    }
  );
};

const mio = program => {
  inquirer.prompt(questions).then(answers => {
    startDown(answers);
  });
};

program
  .option("-v, --version", "change the version of package.")
  .option("-d, --description", "change the description of package.")
  .parse(process.argv);

const questions = [
  {
    type: "input",
    name: "name",
    message: "project name: (my-app)",
    filter: function(val) {
      return val || "my-app";
    }
  },
  {
    type: "list",
    name: "type",
    message: "What type do you need? (react)",
    choices: ["react", "vue"],
    filter: function(val) {
      return val.toLowerCase() || "react";
    }
  }
];

mio(program);
