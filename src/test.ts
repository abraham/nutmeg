import path = require('path');
import program = require('commander');
import shell = require("shelljs");

import { isNutmegComponent, exit } from './utils';

program.command('test [path]', 'test a Web Component')
  .parse(process.argv);

const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve(program.args[0]);
const distDir = path.resolve(workingDir, './dist');
const typescriptConfigFile = path.resolve(workingDir, 'tsconfig.json');
const webpackConfigFile = path.resolve(nutmegDir, 'webpack.component.config.js');
const tag = workingDir.split('/')[workingDir.split('/').length - 1];
const tscCmd = `tsc --project ${typescriptConfigFile} --watch`;
const webpackCmd = `webpack --config ${webpackConfigFile} --env.tag=${tag} --env.workingDir=${workingDir} --watch`;

const karmaConfigFile = path.resolve(nutmegDir, 'karma.build.conf.js');
const karmaCmd = `karma start ${karmaConfigFile}`;

console.log('nutmegDir', nutmegDir, 'workingDir', workingDir);
console.log('karmaCmd', karmaCmd);

exit("Directory doesn't have a package.json with @nutmeg/element as a dependancy.", !isNutmegComponent(workingDir));

shell.exec(`NUTMEG_WORKING_DIR='${workingDir}' npx ${karmaCmd}`);
