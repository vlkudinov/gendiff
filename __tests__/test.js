import fs from 'fs';
import gendiff from '../src/';

const fixtures = '__tests__/__fixtures__';
const expectedFlat = fs.readFileSync(`${fixtures}/expected.txt`, 'utf8');
const expectedNested = fs.readFileSync(`${fixtures}/expected.nested.txt`, 'utf8');

test('compare not supported files', () => {
  const path1 = `${fixtures}/xml/not_supported.xml`;
  const path2 = `${fixtures}/xml/not_supported.xml`;
  expect(() => gendiff(path1, path2)).toThrowError('unkown format: .xml');
});
test('compare different file types', () => {
  const path1 = `${fixtures}/json/before.json`;
  const path2 = `${fixtures}/yaml/after.yml`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedFlat);
});

test('compare json', () => {
  const path1 = `${fixtures}/json/before.json`;
  const path2 = `${fixtures}/json/after.json`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedFlat);
});

test('compare yaml', () => {
  const path1 = `${fixtures}/yaml/before.yaml`;
  const path2 = `${fixtures}/yaml/after.yaml`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedFlat);
});

test('compare yml', () => {
  const path1 = `${fixtures}/yaml/before.yml`;
  const path2 = `${fixtures}/yaml/after.yml`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedFlat);
});

test('compare ini', () => {
  const path1 = `${fixtures}/ini/before.ini`;
  const path2 = `${fixtures}/ini/after.ini`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedFlat);
});

test('compare nested json', () => {
  const path1 = `${fixtures}/json/before.nested.json`;
  const path2 = `${fixtures}/json/after.nested.json`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedNested);
});

test('compare nested yaml', () => {
  const path1 = `${fixtures}/yaml/before.nested.yaml`;
  const path2 = `${fixtures}/yaml/after.nested.yaml`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedNested);
});

test('compare nested yml', () => {
  const path1 = `${fixtures}/yaml/before.nested.yml`;
  const path2 = `${fixtures}/yaml/after.nested.yml`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedNested);
});

test('compare nested ini', () => {
  const path1 = `${fixtures}/ini/before.nested.ini`;
  const path2 = `${fixtures}/ini/after.nested.ini`;
  const current = gendiff(path1, path2);
  expect(current).toBe(expectedNested);
});
