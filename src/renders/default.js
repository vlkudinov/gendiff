import _ from 'lodash';
import colors from 'colors';

const makeIndent = count => `${'  '.repeat(count * 2)}`;

const renderObj = (value, depth) => {
  if (value instanceof Object) {
    const result = Object.keys(value).map(key => `${makeIndent(depth + 2)}${key}: ${value[key]}`, []).join(', ');
    return `{\n${result}\n${makeIndent(depth + 1)}}`;
  }
  return value;
};

const propertyActions = {
  nested: (elem, depth, render) => `${makeIndent(depth)}    ${elem.key}: ${render(elem.children, depth + 1)}`,
  added: (elem, depth) => `${makeIndent(depth)}  ${colors.green(`+ ${elem.key}: ${renderObj(elem.value, depth)}`)}`,
  deleted: (elem, depth) => `${makeIndent(depth)}  ${colors.red(`- ${elem.key}: ${renderObj(elem.value, depth)}`)}`,
  updated: (elem, depth) => [`${makeIndent(depth)}  ${colors.green(`+ ${elem.key}: ${renderObj(elem.newValue, depth)}`)}`,
    `${makeIndent(depth)}  ${colors.red(`- ${elem.key}: ${renderObj(elem.oldValue, depth)}`)}`],
  unchanged: (elem, depth) => `${makeIndent(depth)}    ${elem.key}: ${renderObj(elem.value, depth)}`,
};

const render = (ast, depth = 0) => {
  const result = _.flatten(ast.map(elem => propertyActions[elem.type](elem, depth, render))).join('\n');
  return `{\n${result}\n${makeIndent(depth)}}`;
};

export default render;

