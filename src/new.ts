import * as path from 'path';
import * as program from 'commander';
import * as shell from 'shelljs';

import { Component } from './component';
import { Generator } from './generator';
import { hasYarn, exit, commitToGit, installDependencies, notifyOfUpdate } from './utils';
import { Properties, Property } from './properties';

notifyOfUpdate();

program.command('new <component-name> [property:type...]', 'generate a Web Component')
       .option('--cli-source <location>', 'install @nutmeg/cli dependency from local or github')
       .option('--no-yarn', 'always use NPM')
       .option('--no-dependencies', 'skip installing dependencies');

program.parse(process.argv);

const component = new Component(program.args[0]);
const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve('./');
const cliSource = program.cliSource || require('../package.json')['version'];
const requestedProperties = program.args.slice(1);
const properties = new Properties(requestedProperties);
const generator = new Generator(nutmegDir, workingDir, component.tag);
const data = {
  cliSource: cliSource,
  name: component.name,
  primitiveTypes: properties.primitiveTypes,
  properties: properties,
  tag: component.tag,
};

exit('Component name must be in format of `foo-bar`', !component.valid);
exit(`Directory "${component.tag}" already exists`, generator.destinationDirExists);
exit('Properties must be in format of `name:type`', !properties.valid);

generator.execute(data)
  .then(() => {
    shell.cd(component.tag);
    commitToGit();
    installDependencies({ withYarn: program.yarn, withDependencies: program.dependencies });
    console.log();
    console.log(`Run \`npm run serve\` from ${component.tag} to start 🌱 building`);
  })
  .catch((error: object) => {
    return console.error(`Copy failed: ${error}`);
  });
