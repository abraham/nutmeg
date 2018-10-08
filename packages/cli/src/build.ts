import * as program from 'commander';
import * as path from 'path';
import * as shell from 'shelljs';
import { Component } from './component';
import { exit, isNutmegComponent, notifyOfUpdate, nutmegDir, tsconfigPath } from './utils';

notifyOfUpdate();

program.command('build <path>', 'compile a Web Component')
       .option('--analyzer', 'enable Webpack Bundle Analyzer')
       .option('--production', 'compile a Web Component for deployment')
       .parse(process.argv);

const workingDir = path.resolve(process.cwd(), program.args[0]);
const webpackConfigFile = path.resolve(nutmegDir, 'webpack.component.config.js');
const tag = Component.tagFromPackage(workingDir);
const productionFlag = program.production ? '--env.production' : '';
const analyzerFlag = program.analyzer ? '--env.analyzer' : '';
const tscCmd = `tsc --project ${tsconfigPath(workingDir)}`;
const webpackCmd = `webpack --config ${webpackConfigFile} --env.tag=${tag} ${productionFlag} ${analyzerFlag} --env.workingDir=${workingDir}`;

exit("Directory doesn't have a package.json with @nutmeg/seed as a dependancy.", !isNutmegComponent(workingDir));

shell.exec(`npx ${tscCmd}`);
shell.exec(`npx ${webpackCmd}`);
