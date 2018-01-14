import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';
import hasbin = require('hasbin');
import * as updateNotifier from 'update-notifier';
import { NotifyOptions } from 'update-notifier';

const pkg = require('../package.json');

function notifyOfUpdate() {
  updateNotifier({ pkg: pkg }).notify({ defer: true } as NotifyOptions);
}

function isNutmegComponent(workingDir: string): boolean {
  try {
    const meta = loadPackageJson(workingDir);
    return meta && meta.dependencies && meta.dependencies.hasOwnProperty('@nutmeg/seed');
  } catch(e) {
    return false;
  }
}

function loadPackageJson(dir: string): { dependencies: {}, main: string } {
  const packagePath = path.resolve(dir, 'package.json');
  return JSON.parse(fs.readFileSync(packagePath).toString());
}

function hasYarn(): boolean {
  return hasbin.sync('yarn');
}

function exit(message: string, condition = true): void {
  if (condition) {
    console.error(message);
    process.exit(1);
  }
}

function commitToGit(): void {
  shell.exec('git init', { silent: true });
  shell.exec('git add .', { silent: true });
  shell.exec('git commit -m "Initial commit from @nutmeg/cli"', { silent: true });
  console.log('🗄️  Commiting files to initial Git repository');
}

function installDependencies(options: { withYarn: boolean, withDependencies: boolean }): void {
  if (!options.withDependencies) {
    console.log('📦 Skipping dependencies');
  } else {
    const useYarn = hasYarn() && options.withYarn;
    console.log(`🎁 Installing dependencies with ${useYarn ? 'Yarn' : 'NPM'}`);
    if (useYarn) {
      shell.exec('yarn', { silent: true });
    } else {
      shell.exec('npm install', { silent: true });
    }
  }
}

export {
  commitToGit,
  exit,
  hasYarn,
  installDependencies,
  isNutmegComponent,
  loadPackageJson,
  notifyOfUpdate,
};
