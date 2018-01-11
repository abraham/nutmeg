import path = require('path');
import program = require('commander');
import shell = require("shelljs");

import { Component } from './component';
import { isNutmegComponent, exit } from './utils';

program.command('build <path>', 'compile a Web Component')
       .option('--production', 'compile a Web Component for deployment') // NOTE: This is currently not used.
       .parse(process.argv);

const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve(program.args[0]);
const typescriptConfigFile = path.resolve(workingDir, 'tsconfig.json');
const webpackConfigFile = path.resolve(nutmegDir, 'webpack.component.config.js');
const tag = Component.tagFromPath(workingDir);
const tscCmd = `tsc --project ${typescriptConfigFile}`;
const webpackCmd = `webpack --config ${webpackConfigFile} --env.tag=${tag} --env.workingDir=${workingDir}`;

exit("Directory doesn't have a package.json with @nutmeg/element as a dependancy.", !isNutmegComponent(workingDir));

shell.exec(`npx ${tscCmd}`);
shell.exec(`npx ${webpackCmd}`);
