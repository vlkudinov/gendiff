#!/usr/bin/env node
import program from 'commander';
import gendiff from '../.';

program
  .version('0.5.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) =>
    console.log(gendiff(firstConfig, secondConfig, program.format)))
  .parse(process.argv);

if (!program.args.length) program.help();
