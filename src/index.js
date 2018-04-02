import fs from 'fs';
import _ from 'lodash';

const gendiff = (file1, file2) => {
  const uniqueKeys = _.union(Object.keys(file1), Object.keys(file2));

  const compare = uniqueKeys.reduce((acc, key) => {
    if (!_.has(file2, key)) {
      return `${acc}  - ${key}: ${file1[key]}\n`;
    } else if (!_.has(file1, key)) {
      return `${acc}  + ${key}: ${file2[key]}\n`;
    } else if (file1[key] !== file2[key]) {
      return `${acc}  + ${key}: ${file2[key]}\n  - ${key}: ${file1[key]}\n`;
    }
    return `${acc}    ${key}: ${file1[key]}\n`;
  }, '');
  return `{\n${compare}}`;
};

export default (path1, path2) => {
  const file1 = fs.readFileSync(path1);
  const file2 = fs.readFileSync(path2);
  return gendiff(JSON.parse(file1), JSON.parse(file2));
};
