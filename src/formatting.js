export default {
  makeIndent(count) { return `${'  '.repeat(count * 2)}`; },
  renderObj(value, depth) {
    if (value instanceof Object) {
      const res = Object.keys(value).map(key => `${this.makeIndent(depth + 2)}${key}: ${value[key]}`, []).join(', ');
      return `{\n${res}\n${this.makeIndent(depth + 1)}}`;
    }
    return value;
  },
};
