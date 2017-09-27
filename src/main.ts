import program = require('commander');

program
  .version('0.1.6')
  .usage('new <name> [attribute:type...]')
  .command('new <name> [attribute:type...]', 'generate a Web Component');

program.parse(process.argv);
