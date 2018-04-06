import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import getRender from './renders';

const propertyActions = [
  {
    type: 'nested',
    check: (firstFile, secondFile) => firstFile instanceof Object && secondFile instanceof Object,
    make: (key, type, firstFile, secondFile, func) =>
      ({ key, type: 'nested', children: func(firstFile, secondFile) }),
  },
  {
    type: 'added',
    check: firstFile => !firstFile,
    make: (key, type, firstFile, secondFile) =>
      ({ key, type: 'added', value: secondFile }),
  },
  {
    type: 'deleted',
    check: (firstFile, secondFile) => !secondFile,
    make: (key, type, firstFile) =>
      ({ key, type: 'deleted', value: firstFile }),
  },
  {
    type: 'updated',
    check: (firstFile, secondFile) => firstFile !== secondFile,
    make: (key, type, firstFile, secondFile) =>
      ({
        key, type: 'updated', oldValue: firstFile, newValue: secondFile,
      }),
  },
  {
    type: 'unchanged',
    check: (firstFile, secondFile) => firstFile === secondFile,
    make: (key, type, firstFile) =>
      ({ key, type: 'unchanged', value: firstFile }),
  },
];

const getAST = (firstFile, secondFile) => {
  const uniqueKeys = _.union(Object.keys(firstFile), Object.keys(secondFile));
  return uniqueKeys.map((key) => {
    const { type, make } = _.find(propertyActions, ({ check }) =>
      check(firstFile[key], secondFile[key]));
    return make(key, type, firstFile[key], secondFile[key], getAST);
  });
};

export default (firstPath, secondPath, format = 'default') => {
  const firstFileParse = getParser(path.extname(firstPath));
  const secondFileParse = getParser(path.extname(secondPath));
  const firstFile = fs.readFileSync(firstPath, 'utf8');
  const secondFile = fs.readFileSync(secondPath, 'utf8');
  const ast = getAST(firstFileParse(firstFile), secondFileParse(secondFile));
  return getRender(format)(ast);
};

