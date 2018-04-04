import format from './formatting';

export default [
  {
    type: 'nested',
    check: (firstFile, secondFile) => firstFile instanceof Object && secondFile instanceof Object,
    make: (key, type, firstFile, secondFile, func) =>
      ({ key, type: 'nested', children: func(firstFile, secondFile) }),
    toString: (elem, depth, render) => `${format.makeIndent(depth)}    ${elem.key}: ${render(elem.children, depth + 1)}`,
  },
  {
    type: 'added',
    check: (firstFile, secondFile) => !firstFile && secondFile,
    make: (key, type, firstFile, secondFile) =>
      ({ key, type: 'added', value: secondFile }),
    toString: (elem, depth) => `${format.makeIndent(depth)}  + ${elem.key}: ${format.renderObj(elem.value, depth)}`,
  },
  {
    type: 'deleted',
    check: (firstFile, secondFile) => firstFile && !secondFile,
    make: (key, type, firstFile) =>
      ({ key, type: 'deleted', value: firstFile }),
    toString: (elem, depth) => `${format.makeIndent(depth)}  - ${elem.key}: ${format.renderObj(elem.value, depth)}`,
  },
  {
    type: 'updated',
    check: (firstFile, secondFile) => firstFile !== secondFile,
    make: (key, type, firstFile, secondFile) =>
      ({ key, type: 'updated', value: [firstFile, secondFile]}),
    toString: (elem, depth) => [`${format.makeIndent(depth)}  + ${elem.key}: ${format.renderObj(elem.value[1], depth)}`,
      `${format.makeIndent(depth)}  - ${elem.key}: ${format.renderObj(elem.value[0], depth)}`],
  },
  {
    type: 'unchanged',
    check: (firstFile, secondFile) => firstFile === secondFile,
    make: (key, type, firstFile) =>
      ({ key, type: 'unchanged', value: firstFile }),
    toString: (elem, depth) => `${format.makeIndent(depth)}    ${elem.key}: ${format.renderObj(elem.value, depth)}`,
  },
];
