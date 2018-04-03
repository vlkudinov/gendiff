import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';


const gendiff = (file1, file2) => {
  const uniqueKeys = _.union(Object.keys(file1), Object.keys(file2));

  const makeString = (obj, key, symbol) => `\n\t${symbol} ${key}: ${obj[key]}`;

  const compare = uniqueKeys.map((key) => {
    if (!_.has(file2, key)) {
      return makeString(file1, key, '-');
    } else if (!_.has(file1, key)) {
      return makeString(file2, key, '+');
    } else if (file1[key] !== file2[key]) {
      return `${makeString(file2, key, '+')}${makeString(file1, key, '-')}`;
    }
    return makeString(file1, key, ' ');
  }).join('');
  return `{${compare}\n}`;
};

export default (path1, path2) => {
  const ext = path.extname(path1);
  const parse = getParser(ext);
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  return gendiff(parse(file1), parse(file2));
};
