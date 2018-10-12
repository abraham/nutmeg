import * as path from 'path';
import * as shell from 'shelljs';
import { pkg } from '../src/utils';

shell.config.verbose = process.env.DEBUG === 'true';

const cliTgzName = `nutmeg-cli-${pkg.version}.tgz`;
const seedTgzName = `nutmeg-seed-${pkg.version}.tgz`;
const pkgsDir = path.resolve('..');
const cliDir = path.resolve(pkgsDir, 'cli');
const seedDir = path.resolve(pkgsDir, 'seed');
const createDir = path.resolve(pkgsDir, 'create');
const cliTgz = path.resolve(cliDir, cliTgzName);
const seedTgz = path.resolve(seedDir, seedTgzName);
const sources = `--cli-source file:${cliTgz} --seed-source file:${seedTgz}`;
const attributes = 'first:number second:string third:boolean';
const testDir = path.resolve(shell.tempdir(), 'nutmeg', 'create');

setupForTests();

shell.cd(testDir);
shell.exec(`npx ${createDir} ci-test ${attributes} ${sources}`);
shell.cd('ci-test');
shell.exec('npm test');

removeTestFiles();

function setupForTests() {
  removeTestFiles();
  shell.mkdir('-p', testDir);
  [cliDir, seedDir].forEach(dir => {
    shell.cd(dir);
    shell.exec('npm pack .', { silent: true });
  });
}

function removeTestFiles() {
  shell.cd(cliDir);
  shell.rm('-rf', [testDir, cliTgz, seedTgz]);
}
