import * as shell from 'shelljs';
import * as path from 'path';
import * as cliPkg from '../package.json';
import * as seedPkg from '../../seed/package.json';

const debug = process.env.DEBUG === 'true'
shell.config.verbose = debug;
const silent = !debug;
const cliTgzName = `nutmeg-cli-${cliPkg.version}.tgz`;
const seedTgzName = `nutmeg-seed-${seedPkg.version}.tgz`;
const pkgsDir = path.resolve('..');
const cliDir = path.resolve(pkgsDir, 'cli');
const seedDir = path.resolve(pkgsDir, 'seed');
const cliTgz = path.resolve(cliDir, cliTgzName);
const seedTgz = path.resolve(seedDir, seedTgzName);
const nutmegPath = path.resolve(cliDir, 'bin', 'nutmeg');
const sources = `--cli-source file:${cliTgz} --seed-source file:${seedTgz}`;
const attributes = 'first:number second:string third:boolean';
const installCmd = `${nutmegPath} new ci-test ${attributes} ${sources}`;
const testDir = path.resolve(shell.tempdir(), 'nutmeg');

setupForTests();

shell.cd(testDir);
shell.exec(installCmd);
shell.cd('ci-test');
shell.exec('npm test');

removeTestFiles();

function setupForTests() {
  removeTestFiles();
  shell.mkdir(testDir);
  [cliDir, seedDir].forEach(dir => {
    shell.cd(dir);
    shell.exec('npm pack .', { silent });
  });
}

function removeTestFiles() {
  shell.cd(cliDir);
  shell.rm('-rf', [testDir, cliTgz, seedTgz]);
}
