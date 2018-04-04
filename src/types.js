import { makeIndent, renderObj } from './formatters';

export default [
  {
    type: 'nested',
    check: (firstFile, secondFile) => firstFile instanceof Object && secondFile instanceof Object,
    make: (key, type, firstFile, secondFile, func) =>
      ({ key, type: 'nested', children: func(firstFile, secondFile) }),
    stringify: (elem, depth = 0, render) => `${makeIndent(depth)}    ${elem.key}: ${render(elem.children, depth + 1)}`,
  },
  {
    type: 'added',
    check: firstFile => !firstFile,
    make: (key, type, firstFile, secondFile) =>
      ({ key, type: 'added', value: secondFile }),
    stringify: (elem, depth = 0) => `${makeIndent(depth)}  + ${elem.key}: ${renderObj(elem.value, depth)}`,
  },
  {
    type: 'deleted',
    check: (firstFile, secondFile) => !secondFile,
    make: (key, type, firstFile) =>
      ({ key, type: 'deleted', value: firstFile }),
    stringify: (elem, depth = 0) => `${makeIndent(depth)}  - ${elem.key}: ${renderObj(elem.value, depth)}`,
  },
  {
    type: 'updated',
    check: (firstFile, secondFile) => firstFile !== secondFile,
    make: (key, type, firstFile, secondFile) =>
      ({ key, type: 'updated', value: [firstFile, secondFile] }),
    stringify: (elem, depth = 0) => [`${makeIndent(depth)}  + ${elem.key}: ${renderObj(elem.value[1], depth)}`,
      `${makeIndent(depth)}  - ${elem.key}: ${renderObj(elem.value[0], depth)}`],
  },
  {
    type: 'unchanged',
    check: (firstFile, secondFile) => firstFile === secondFile,
    make: (key, type, firstFile) =>
      ({ key, type: 'unchanged', value: firstFile }),
    stringify: (elem, depth = 0) => `${makeIndent(depth)}    ${elem.key}: ${renderObj(elem.value, depth)}`,
  },
];
