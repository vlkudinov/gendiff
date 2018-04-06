import fs from 'fs';
import gendiff from '../src/';

const fixturesPath = '__tests__/__fixtures__';

test('compare not supported files', () => {
  const path1 = `${fixturesPath}/xml/not_supported.xml`;
  const path2 = `${fixturesPath}/xml/not_supported.xml`;
  expect(() => gendiff(path1, path2)).toThrowError('unkown format: .xml');
});
test('compare different file types', () => {
  const path1 = `${fixturesPath}/json/before.json`;
  const path2 = `${fixturesPath}/yaml/after.yml`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare json', () => {
  const path1 = `${fixturesPath}/json/before.json`;
  const path2 = `${fixturesPath}/json/after.json`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare yaml', () => {
  const path1 = `${fixturesPath}/yaml/before.yaml`;
  const path2 = `${fixturesPath}/yaml/after.yaml`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare yml', () => {
  const path1 = `${fixturesPath}/yaml/before.yml`;
  const path2 = `${fixturesPath}/yaml/after.yml`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare ini', () => {
  const path1 = `${fixturesPath}/ini/before.ini`;
  const path2 = `${fixturesPath}/ini/after.ini`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare nested json', () => {
  const path1 = `${fixturesPath}/json/before.nested.json`;
  const path2 = `${fixturesPath}/json/after.nested.json`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.nested.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare nested yaml', () => {
  const path1 = `${fixturesPath}/yaml/before.nested.yaml`;
  const path2 = `${fixturesPath}/yaml/after.nested.yaml`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.nested.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare nested yml', () => {
  const path1 = `${fixturesPath}/yaml/before.nested.yml`;
  const path2 = `${fixturesPath}/yaml/after.nested.yml`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.nested.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare nested ini', () => {
  const path1 = `${fixturesPath}/ini/before.nested.ini`;
  const path2 = `${fixturesPath}/ini/after.nested.ini`;
  const current = gendiff(path1, path2);
  const expected = fs.readFileSync(`${fixturesPath}/expected.nested.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare nested json --plain', () => {
  const path1 = `${fixturesPath}/json/before.nested.json`;
  const path2 = `${fixturesPath}/json/after.nested.json`;
  const current = gendiff(path1, path2, 'plain');
  const expected = fs.readFileSync(`${fixturesPath}/expected.plain.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare nested yaml --plain', () => {
  const path1 = `${fixturesPath}/yaml/before.nested.yaml`;
  const path2 = `${fixturesPath}/yaml/after.nested.yaml`;
  const current = gendiff(path1, path2, 'plain');
  const expected = fs.readFileSync(`${fixturesPath}/expected.plain.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare nested yml --plain', () => {
  const path1 = `${fixturesPath}/yaml/before.nested.yml`;
  const path2 = `${fixturesPath}/yaml/after.nested.yml`;
  const current = gendiff(path1, path2, 'plain');
  const expected = fs.readFileSync(`${fixturesPath}/expected.plain.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare nested ini --plain', () => {
  const path1 = `${fixturesPath}/ini/before.nested.ini`;
  const path2 = `${fixturesPath}/ini/after.nested.ini`;
  const current = gendiff(path1, path2, 'plain');
  const expected = fs.readFileSync(`${fixturesPath}/expected.plain.txt`, 'utf8');
  expect(current).toBe(expected);
});

test('compare json --json', () => {
  const path1 = `${fixturesPath}/json/before.nested.json`;
  const path2 = `${fixturesPath}/json/after.nested.json`;
  const current = gendiff(path1, path2, 'json');
  const expected = fs.readFileSync(`${fixturesPath}/expected.json`, 'utf8');
  expect(current).toBe(expected);
});
