import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import { fileURLToPath } from 'url';
import updateNotifier from 'update-notifier';

const silent = true;
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const nutmegDir = path.resolve(currentDir, '..');
const pkg = loadPackageJson(nutmegDir);

interface Pkg {
  dependencies: { [index: string]: string };
  main: string;
  name: string;
  version: string;
}

function tsconfigPath(workingDir: string): string {
  return path.resolve(workingDir, 'tsconfig.production.json');
}

// Vite's fs.allow check compares paths as posix strings; a backslash-based
// Windows path passed as --root/--config causes it to reject its own files.
function toPosixPath(input: string): string {
  return input.replace(/\\/g, '/');
}

function notifyOfUpdate() {
  updateNotifier({ pkg }).notify({ defer: true });
}

function isNutmegComponent(workingDir: string): boolean {
  try {
    const { dependencies } = loadPackageJson(workingDir);
    return dependencies && dependencies.hasOwnProperty('@nutmeg/seed');
  } catch (e) {
    return false;
  }
}

function loadPackageJson(dir: string): Pkg {
  const packagePath = path.resolve(dir, 'package.json');
  return JSON.parse(fs.readFileSync(packagePath).toString());
}

function exit(message: string, condition = true): void {
  if (condition) {
    console.error(message);
    process.exit(1);
  }
}

function commitToGit(): void {
  shell.exec('git init', { silent });
  shell.exec('git add .', { silent });
  shell.exec('git commit -m "Initial commit from @nutmeg/cli"', { silent });
  console.log('🗄️  Commiting files to initial Git repository');
}

function installDependencies(options: { withDependencies: boolean }): void {
  if (!options.withDependencies) {
    console.log('📦 Skipping dependencies');
  } else {
    console.log(`🎁 Installing dependencies`);
    shell.exec('npm install', { silent });
  }
}

/** Copied from @nutmeg/seed. Make changes there. */
export function attributeNameFromProperty(name: string): string {
  return name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

/** Copied from @nutmeg/seed. Make changes there. */
export function propertyNameFromAttribute(name: string): string {
  if (name.includes('-')) {
    return name.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  } else {
    return name;
  }
}

export {
  commitToGit,
  exit,
  installDependencies,
  isNutmegComponent,
  loadPackageJson,
  notifyOfUpdate,
  toPosixPath,
  tsconfigPath,
  nutmegDir,
  pkg,
};
