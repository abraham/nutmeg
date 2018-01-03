import path = require('path');
import program = require('commander');
import shell = require("shelljs");

import { Component } from './component';
import { Generator } from './generator';
import { hasYarn, exit, commitToGit, installDependencies } from './utils';
import { Properties, Property } from './properties';

program.command('new <name> [property:type...]', 'generate a Web Component')
program.parse(process.argv);

const component = new Component(program.args[0]);
const nutmegDir = path.resolve(process.argv[1]);
const workdingDir = path.resolve('./');
const requestedProperties = program.args.slice(1);
const properties = new Properties(requestedProperties);
const generator = new Generator(nutmegDir, workdingDir, component.tag);
const data = {
  name: component.name,
  tag: component.tag,
  properties: properties,
  observedAttributes: properties.primitive.map(property => property.name),
  observedProperties: properties.complex.map(property => property.name),
  primitiveTypes: properties.primitiveTypes,
};

if (!component.valid) {
   exit('Component name must be in format of `foo-bar`');
}
if (generator.destinationDirExists) {
   exit(`Directory "${component.tag}" already exists`);
}
if (!properties.valid) {
  exit('Properties must be in format of `name:type`');
}

generator.execute(data)
  .then(() => {
    shell.cd(component.tag);
    commitToGit();
    installDependencies();
    console.log('');
    console.log(`Run \`npm run serve\` from ${component.tag} to start 🌱 building`);
  })
  .catch((error: object) => {
    return console.error(`Copy failed: ${error}`);
  });
