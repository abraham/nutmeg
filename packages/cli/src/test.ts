import { Command } from 'commander';
import path from 'path';
import shell from 'shelljs';
import {
  exit,
  isNutmegComponent,
  notifyOfUpdate,
  nutmegDir,
  toPosixPath,
} from './utils';

notifyOfUpdate();

const program = new Command();

program
  .description('test a Web Component')
  .argument('<path>')
  .allowUnknownOption()
  .parse(process.argv);

const workingDir = path.resolve(process.cwd(), program.args[0]);
const vitestConfigFile = path.resolve(nutmegDir, 'vitest.component.config.ts');
const vitestCmd = `vitest run --root ${toPosixPath(
  workingDir,
)} --config ${toPosixPath(vitestConfigFile)}`;

exit(
  "Directory doesn't have a package.json with @nutmeg/seed as a dependancy.",
  !isNutmegComponent(workingDir),
);

const result = shell.exec(`npx ${vitestCmd}`);
process.exit(result.code);
