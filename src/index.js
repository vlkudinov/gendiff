import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import types from './types';

const differ = (firstFile, secondFile) => {
  const uniqueKeys = _.union(Object.keys(firstFile), Object.keys(secondFile));
  return uniqueKeys.map((key) => {
    const { type, make } = _.find(types, ({ check }) =>
      check(firstFile[key], secondFile[key]));
    return make(key, type, firstFile[key], secondFile[key], differ);
  });
};

const render = (ast, depth = 0) => {
  const result = _.flatten(ast.map((elem) => {
    const { stringify } = _.find(types, ({ type }) => type === elem.type);
    return stringify(elem, depth, render);
  })).join('\n');
  return `{\n${result}\n${' '.repeat(depth * 4)}}`;
};

export default (firstPath, secondPath) => {
  const firstFileParse = getParser(path.extname(firstPath));
  const secondFileParse = getParser(path.extname(secondPath));
  const firstFile = fs.readFileSync(firstPath, 'utf8');
  const secondFile = fs.readFileSync(secondPath, 'utf8');
  const diff = differ(firstFileParse(firstFile), secondFileParse(secondFile));
  return render(diff);
};
