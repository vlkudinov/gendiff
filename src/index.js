import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import typesList from './types';

const differ = (firstFile, secondFile) => {
  const uniqueKeys = _.union(Object.keys(firstFile), Object.keys(secondFile));
  return uniqueKeys.map((key) => {
    const { type, make } = _.find(typesList, ({ check }) =>
      check(firstFile[key], secondFile[key]));
    return make(key, type, firstFile[key], secondFile[key], differ);
  });
};

const render = (ast, depth = 0) => {
  const result = _.flatten(ast.map((node) => {
    const { toString } = _.find(typesList, ({ type }) => type === node.type);
    return toString(node, depth, render);
  })).join('\n');
  return `{\n${result}\n${' '.repeat(depth * 4)}}`;
};

export default (path1, path2) => {
  const ext = path.extname(path1);
  const parse = getParser(ext);
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  const diff = differ(parse(file1), parse(file2));
  return render(diff);
};
