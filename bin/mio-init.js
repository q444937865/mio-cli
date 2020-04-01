#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const spinner = ora("Download...");
const reWritePac = name => {
  if (typeof program.description == "string") {
    const newPacPath = `${path.resolve("./")}/${name}/package.json`;
    const newPacJson = require(newPacPath);
    newPacJson.description = program.description;
    fs.writeFile(newPacPath, JSON.stringify(newPacJson), err => {
      if (err) console.error(err);
    });
  }
};

const startDown = (answers, program) => {
  spinner.start();
  const { name, type } = answers;
  let url = "direct:https://gitee.com/zz_418/react-zz.git#master";
  // github可以省略前面，如 "q444937865/react-zz"
  if (type == "vue") {
    url = "";
    console.log("暂无vue模板..如果你能提供..");
    return;
  }
  download(url, name, { clone: true }, err => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(` download failed. \n ${err}`));
      return;
    }
    spinner.succeed();
    reWritePac(name);
    console.log(chalk.green("\n download completed!"));
    console.log(chalk.green("\n    have fun ~"));
  });
};

const mio = program => {
  inquirer.prompt(questions).then(answers => {
    startDown(answers, program);
  });
};

program.option("-d, --description [des]", "change the description of package.").parse(process.argv);

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
