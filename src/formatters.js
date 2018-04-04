const makeIndent = count => `${'  '.repeat(count * 2)}`;

const renderObj = (value, depth) => {
  if (value instanceof Object) {
    const result = Object.keys(value).map(key => `${makeIndent(depth + 2)}${key}: ${value[key]}`, []).join(', ');
    return `{\n${result}\n${makeIndent(depth + 1)}}`;
  }
  return value;
};

export { makeIndent, renderObj };
