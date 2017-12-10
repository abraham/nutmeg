import program = require('commander');
import path = require('path');
import copy = require('recursive-copy');
import fs = require('fs');
import template = require('lodash.template');
import through = require('through2');
import pascalCase = require('pascal-case')
import shell = require("shelljs");

program.command('new <name> [property:type...]', 'generate a Web Component')
program.parse(process.argv);

const tag = program.args[0];
const workdingDir = path.resolve('./');
const templateDir = path.resolve(process.argv[1], '../../element-template');
const destinationDir = path.resolve(workdingDir, `./${tag}`);

const validName = 0 < tag.indexOf('-')
  && tag.indexOf('-') < tag.length - 1
  && tag === tag.toLowerCase();

if (!validName) {
   console.error('Name must be in format of `foo-bar`');
   process.exit(1);
}

if (fs.existsSync(destinationDir)) {
   console.error('Directory already exists with the same name');
   process.exit(1);
}

let validAttributes = true;
// TODO: Validate attribute types
// const validTypes = ['boolean', 'number', 'string'];

program.args.slice(1).forEach((attribute) => {
  let validAttribute = 0 < attribute.indexOf(':')
    && attribute.indexOf(':') < attribute.length - 1;
  if (!validAttribute) {
    validAttributes = false;
  }
});

if (!validAttributes) {
 console.error('Attributes must be in format of `name:type`');
 process.exit(1);
}

const attributes = program.args.slice(1).map((attribute) => {
  return {
    name: attribute.split(':')[0],
    type: attribute.split(':')[1],
  };
});

const templateOptions = {
  interpolate: /<%=([\s\S]+?)%>/g,
  imports: {
    partial: function(partialName: string, data: object) {
      let partial = fs.readFileSync(path.resolve(templateDir, './partial', partialName)).toString();
      return template(partial, templateOptions)(data);
    },
  },
};
const primitiveTypes = ['boolean', 'number', 'string'];
const richTypes = ['object', 'array'];
const data = {
  name: pascalCase(tag),
  tag: tag,
  attributes: attributes,
  observedAttributes: attributes.filter(attr => primitiveTypes.includes(attr.type)).map(attr => attr.name),
  primitiveTypes: primitiveTypes,
  richTypes: richTypes,
};
const copyOptions = {
  overwrite: true,
  dot: true,
  filter: [
    '**/*',
    '!partial',
    '!partial/*',
  ],
  rename: function(filePath: string) {
    if (['gitignore', 'travis.yml'].includes(filePath)) {
      return `.${filePath}`;
    }
    return filePath.replace('element-template', tag).replace('.template', '');
  },
  transform: function(_src: string, _dest: string, _stats: object) {
    return through(function(chunk: string, _enc: string, done: any)    {
      done(null, template(chunk, templateOptions)(data));
    });
  }
};

copy(templateDir, destinationDir, copyOptions)
  .on(copy.events.COPY_FILE_START, function(copyOperation: any) {
    console.info('Copying file ' + copyOperation.dest.split(`${workdingDir}/`)[1]);
  })
  .on(copy.events.ERROR, function(_error: object, copyOperation: any) {
    console.error('Unable to copy ' + copyOperation.dest.split(`${workdingDir}/`)[1]);
  })
  .then(function(results: object[]) {
    console.info(results.length + ' files copied');
    shell.cd(tag);
    shell.exec('git init');
    shell.exec('git add .');
    shell.exec('git commit -m "Initial commit from @nutmeg/cli"');
    console.log('Installing dependencies');
    shell.exec('npm install');
    console.log('');
    console.log('Run `npm run serve` to start 🌱 building');
  })
  .catch(function(error: object) {
    return console.error('Copy failed: ' + error);
  });
