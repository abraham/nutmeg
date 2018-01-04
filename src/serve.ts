import path = require('path');
import program = require('commander');
import shell = require("shelljs");

program.command('build [path]', 'compile a Web Component')
  .parse(process.argv);

const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve(program.args[0]);
const distDir = path.resolve(workingDir, './dist');
const typescriptConfigFile = path.resolve(workingDir, 'tsconfig.json');
const webpackConfigFile = path.resolve(nutmegDir, 'webpack.build.config.js');
const tag = workingDir.split('/')[workingDir.split('/').length - 1];
const tscCmd = `tsc --project ${typescriptConfigFile} --watch`;
const webpackCmd = `webpack-dev-server --config ${webpackConfigFile} --env.tag=${tag} --env.workingDir=${workingDir} --open`;

console.log('webpackCmd', webpackCmd);
console.log('nutmegDir', nutmegDir, 'workingDir', workingDir);

// TODO: validate package.json exists
// TODO: validate tag name from directory

shell.exec(`rm -rf ${distDir}`);
shell.exec(`npx ${tscCmd} & npx ${webpackCmd}`);
