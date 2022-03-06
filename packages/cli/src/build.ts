import { Command } from 'commander';
import path from 'path';
import shell from 'shelljs';
import { exit, isNutmegComponent, notifyOfUpdate, tsconfigPath } from './utils';

notifyOfUpdate();

const program = new Command();

program.command('build <path>', 'compile a Web Component').parse(process.argv);

const workingDir = path.resolve(process.cwd(), program.args[0]);
const tscCmd = `tsc --project ${tsconfigPath(workingDir)}`;

exit(
  "Directory doesn't have a package.json with @nutmeg/seed as a dependancy.",
  !isNutmegComponent(workingDir)
);

shell.exec(`npx ${tscCmd}`);
