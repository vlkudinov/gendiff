import fs from 'fs';
import gendiff from '../src/';

const dir = '__tests__/__fixtures__/json';
test('compare json', () => {
  const path1 = `${dir}/before.json`;
  const path2 = `${dir}/after.json`;
  const expected = fs.readFileSync(`${dir}/expected.txt`, 'utf8');
  const current = gendiff(path1, path2);
  expect(current).toBe(expected);
});

