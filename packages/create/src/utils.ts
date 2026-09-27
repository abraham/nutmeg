import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import updateNotifier from 'update-notifier';

const silent = true;
const nutmegDir = path.resolve(__dirname, '..');
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

// Windows path separators break JSON parsing when embedded in generated package.json
function normalizeFileSource(source: string): string {
  return source.startsWith('file:') ? source.replace(/\\/g, '/') : source;
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
  normalizeFileSource,
  notifyOfUpdate,
  tsconfigPath,
  nutmegDir,
  pkg,
};
