import { Command } from 'commander';
import path from 'path';
import shell from 'shelljs';
import { Component } from './component';
import {
  exit,
  isNutmegComponent,
  notifyOfUpdate,
  nutmegDir,
  tsconfigPath,
} from './utils';

notifyOfUpdate();

const program = new Command();

program.command('build <path>', 'compile a Web Component').parse(process.argv);

const workingDir = path.resolve(process.cwd(), program.args[0]);
const webpackConfigFile = path.resolve(
  nutmegDir,
  'webpack.component.config.js'
);
const tag = Component.tagFromPackage(workingDir);
const tscCmd = `tsc --project ${tsconfigPath(workingDir)} --watch`;
const webpackCmd = `webpack --config ${webpackConfigFile} --env.tag=${tag} --env.workingDir=${workingDir} --watch`;

exit(
  "Directory doesn't have a package.json with @nutmeg/seed as a dependancy.",
  !isNutmegComponent(workingDir)
);

shell.exec(`npx ${tscCmd} & npx ${webpackCmd}`);
