import { Command } from 'commander';
import path from 'path';
import shell from 'shelljs';
import { exit, isNutmegComponent, notifyOfUpdate, nutmegDir } from './utils';

notifyOfUpdate();

const program = new Command();

program.command('test <path>', 'test a Web Component').parse(process.argv);

const workingDir = path.resolve(process.cwd(), program.args[0]);
const karmaConfigFile = path.resolve(nutmegDir, 'karma.component.config.js');
const karmaCmd = `karma start ${karmaConfigFile}`;

exit(
  "Directory doesn't have a package.json with @nutmeg/seed as a dependancy.",
  !isNutmegComponent(workingDir)
);

const result = shell.exec(`npx ${karmaCmd}`);
process.exit(result.code);
