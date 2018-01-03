import hasbin = require('hasbin');
import shell = require("shelljs");

function hasYarn(): boolean {
  return hasbin.sync('yarn');
}

function exit(message: string): void {
   console.error(message);
   process.exit(1);
}

function commitToGit(): void {
  shell.exec('git init');
  shell.exec('git add .');
  shell.exec('git commit -m "Initial commit from @nutmeg/cli"');
}

function installDependencies(): void {
  console.log('Installing dependencies');
  if (hasYarn()) {
    shell.exec('yarn');
  } else {
    shell.exec('npm install');
  }
}

export {
  commitToGit,
  exit,
  hasYarn,
  installDependencies,
};
