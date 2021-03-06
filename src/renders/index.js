import defaultRender from './default';
import plainRender from './plain';
import jsonRender from './json';


const renders = {
  default: defaultRender,
  plain: plainRender,
  json: jsonRender,
};

export default format => (data) => {
  const render = renders[format];
  if (!render) {
    throw new Error(`unkown format: ${format}`);
  }
  return render(data);
};
