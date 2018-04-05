#!/usr/bin/env node
import program from 'commander';
import gendiff from '../.';

program
  .version('0.5.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => console.log(gendiff(firstConfig, secondConfig)))
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!program.args.length) program.help();
