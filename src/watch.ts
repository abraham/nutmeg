import path = require('path');
import program = require('commander');
import shell = require("shelljs");

import { Component } from './component';
import { isNutmegComponent, exit } from './utils';

program.command('build [path]', 'compile a Web Component')
  .parse(process.argv);

const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve(program.args[0]);
const typescriptConfigFile = path.resolve(workingDir, 'tsconfig.json');
const webpackConfigFile = path.resolve(nutmegDir, 'webpack.component.config.js');
const tag = Component.tagFromPath(workingDir);
const tscCmd = `tsc --project ${typescriptConfigFile} --watch`;
const webpackCmd = `webpack --config ${webpackConfigFile} --env.tag=${tag} --env.workingDir=${workingDir} --watch`;

exit("Directory doesn't have a package.json with @nutmeg/element as a dependancy.", !isNutmegComponent(workingDir));

shell.exec(`npx ${tscCmd} & npx ${webpackCmd}`);
