import fs from 'fs';
import gendiff from '../src/';

const dir = '__tests__/__fixtures__';

test('compare json', () => {
  const path1 = `${dir}/json/before.json`;
  const path2 = `${dir}/json/after.json`;
  const expected = fs.readFileSync(`${dir}/expected.txt`, 'utf8');
  const current = gendiff(path1, path2);
  expect(current).toBe(expected);
});

test('compare yaml', () => {
  const path1 = `${dir}/yaml/before.yaml`;
  const path2 = `${dir}/yaml/after.yaml`;
  const expected = fs.readFileSync(`${dir}/expected.txt`, 'utf8');
  const current = gendiff(path1, path2);
  expect(current).toBe(expected);
});

test('compare yml', () => {
  const path1 = `${dir}/yaml/before.yml`;
  const path2 = `${dir}/yaml/after.yml`;
  const expected = fs.readFileSync(`${dir}/expected.txt`, 'utf8');
  const current = gendiff(path1, path2);
  expect(current).toBe(expected);
});

test('compare ini', () => {
  const path1 = `${dir}/ini/before.ini`;
  const path2 = `${dir}/ini/after.ini`;
  const expected = fs.readFileSync(`${dir}/expected.txt`, 'utf8');
  const current = gendiff(path1, path2);
  expect(current).toBe(expected);
});

test('compare xml', () => {
  const path1 = `${dir}/xml/not_supported.xml`;
  const path2 = `${dir}/yaml/after.yaml`;
  expect(() => gendiff(path1, path2)).toThrowError('unkown format: .xml');
});

