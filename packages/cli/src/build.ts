import * as path from 'path';
import * as program from 'commander';
import * as shell from 'shelljs';

import { Component } from './component';
import { isNutmegComponent, exit, notifyOfUpdate, tsconfigPath } from './utils';

notifyOfUpdate();

program.command('build <path>', 'compile a Web Component')
       .option('--analyzer', 'enable Webpack Bundle Analyzer')
       .option('--production', 'compile a Web Component for deployment')
       .parse(process.argv);

const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve(program.args[0]);
const webpackConfigFile = path.resolve(nutmegDir, 'webpack.component.config.js');
const tag = Component.tagFromPackage(workingDir);
const productionFlag = program.production ? '--env.production' : '';
const analyzerFlag = program.analyzer ? '--env.analyzer' : '';
const tscCmd = `tsc --project ${tsconfigPath(workingDir)}`;
const webpackCmd = `webpack --config ${webpackConfigFile} --env.tag=${tag} ${productionFlag} ${analyzerFlag} --env.workingDir=${workingDir}`;

exit("Directory doesn't have a package.json with @nutmeg/element as a dependancy.", !isNutmegComponent(workingDir));

shell.exec(`npx ${tscCmd}`);
shell.exec(`npx ${webpackCmd}`);
