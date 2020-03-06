#!/usr/bin/env node
// 指定脚本的执行程序

var program = require("commander");
var config = require("../package.json");

// --help时触发
// program.on("--help", function() {
//   console.log("\n    have fun!\n");
// });
// 定义命令描述
// .description('描述')

// 短标志可以作为单个arg传递;
// 例如node bin/mio -imk = node bin/mio -i -m -k;
// program
//   .option("-i, --init [name]", "init something", 'myApp')
//   .option("-g, --go", "to start a server, for development")
//   .option("-k, --k-on", "to build")
//   .option("-s, --no-start", "stop serve");

// 可选参数 <dir> [options]（<>必填 []选填）;
program
  .version(config.version, "-v, --version")
  .usage("[command] [options]")
  .command("init [name]", "init project")
  .command("go [options]", "to start a server, for development")
  .command("k-on [options]", "to build, for production");

program.parse(process.argv);

// // 运行 node bin/mio -g 或者 node bin/mio --go 触发
// if (program.go) console.log("    mio go");
// // 为字符串
// if (program.init) console.log(`    init ${program.init}`);
// // -会转化为驼峰
// if (program.kOn) console.log("   mio k-on");
// // --no前缀开头的多词选项是其后选项的布尔值的反
// if (!program.start) console.log("   mio stop");
