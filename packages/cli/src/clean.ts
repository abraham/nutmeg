import { Command } from 'commander';
import path from 'path';
import shell from 'shelljs';
import { exit, isNutmegComponent, notifyOfUpdate } from './utils';

notifyOfUpdate();

const program = new Command();

program
  .command('clean <path>', "clean a Web Component's compiled files")
  .parse(process.argv);

const workingDir = path.resolve(process.cwd(), program.args[0]);
const distDir = path.resolve(workingDir, './dist');

exit(
  "Directory doesn't have a package.json with @nutmeg/seed as a dependancy.",
  !isNutmegComponent(workingDir)
);

console.log(`Cleaning ${distDir}`);

shell.exec(`rm -rf ${distDir}`);
