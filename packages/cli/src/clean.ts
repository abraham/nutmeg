import * as path from 'path';
import * as program from 'commander';
import * as shell from 'shelljs';

import { isNutmegComponent, exit, notifyOfUpdate } from './utils';

notifyOfUpdate();

program.command('clean <path>', "clean a Web Component's compiled files")
       .parse(process.argv);

const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve(program.args[0]);
const distDir = path.resolve(workingDir, './dist');

exit("Directory doesn't have a package.json with @nutmeg/element as a dependancy.", !isNutmegComponent(workingDir));

console.log(`Cleaning ${distDir}`);

shell.exec(`rm -rf ${distDir}`);
