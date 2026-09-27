import path from 'path';
import shell from 'shelljs';
import { pkg } from '../src/utils';

shell.config.verbose = process.env.DEBUG === 'true';

const cliTgzName = `nutmeg-cli-${pkg.version}.tgz`;
const pkgsDir = path.resolve('..');
const cliDir = path.resolve(pkgsDir, 'cli');
const seedDir = path.resolve(pkgsDir, 'seed');
const createDir = path.resolve(pkgsDir, 'create');
const cliTgz = path.resolve(cliDir, cliTgzName);
const sources = `--cli-source file:${cliTgz} --seed-source file:${seedDir}`;
const attributes = 'first:number second:string third:boolean';
const testDir = path.resolve(shell.tempdir(), 'nutmeg', 'cli');

setupForTests();

shell.cd(testDir);
// `nutmeg new` is deprecated in favor of `create-nutmeg`, so generate via that instead.
const generate = shell.exec(
  `npx ${createDir} ci-test ${attributes} ${sources}`,
);
shell.cd('ci-test');
const test = generate.code === 0 ? shell.exec('npm test') : generate;

removeTestFiles();

process.exit(test.code);

function setupForTests() {
  removeTestFiles();
  shell.mkdir('-p', testDir);
  shell.cd(cliDir);
  shell.exec('npm pack .', { silent: true });
}

function removeTestFiles() {
  shell.cd(cliDir);
  shell.rm('-rf', [testDir, cliTgz]);
}
