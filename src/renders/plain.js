import _ from 'lodash';
import colors from 'colors';

const checkForComplexValue = (value) => {
  if (value instanceof Object) {
    return colors.magenta('complex value');
  }
  return colors.magenta(`${value}`);
};

const renderParent = parent => `${parent}`;

const propertyActions = {
  nested: (elem, parent, render) =>
    `${render(elem.children, parent.concat(`${elem.key}.`))}`,
  added: (elem, parent) =>
    `Property ${colors.red(`"${renderParent(parent)}${elem.key}"`)} was ${colors.bold('added')} with value: ${checkForComplexValue(elem.value)}.`,
  deleted: (elem, parent) =>
    `Property ${colors.red(`"${renderParent(parent)}${elem.key}"`)} was ${colors.bold('removed')}.`,
  updated: (elem, parent) =>
    `Property ${colors.red(`"${renderParent(parent)}${elem.key}"`)} was ${colors.bold('updated')}. From '${checkForComplexValue(elem.oldValue)}' to '${checkForComplexValue(elem.newValue)}'.`,
};

const render = (ast, parent = '') => {
  const result = _.flatten(ast.filter(elem => elem.type !== 'unchanged')
    .map(elem => propertyActions[elem.type](elem, parent, render))).join('\n');
  return `${result}`;
};

export default render;

