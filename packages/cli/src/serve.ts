import * as program from 'commander';
import * as path from 'path';
import * as shell from 'shelljs';
import { Component } from './component';
import { exit, isNutmegComponent, notifyOfUpdate, tsconfigPath } from './utils';

notifyOfUpdate();

program.command('build <path>', 'compile a Web Component')
       .parse(process.argv);

const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve(program.args[0]);
const webpackConfigFile = path.resolve(nutmegDir, 'webpack.component.config.js');
const tag = Component.tagFromPackage(workingDir);
const tscCmd = `tsc --project ${tsconfigPath(workingDir)} --watch`;
const webpackCmd = `webpack-dev-server --config ${webpackConfigFile} --env.tag=${tag} --env.workingDir=${workingDir} --open`;

exit("Directory doesn't have a package.json with @nutmeg/element as a dependancy.", !isNutmegComponent(workingDir));

shell.exec(`npx ${tscCmd} & npx ${webpackCmd}`);
