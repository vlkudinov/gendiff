import defaultRender from './default';
import plainRender from './plain';


const renders = {
  default: defaultRender,
  plain: plainRender,
};

export default format => (data) => {
  const render = renders[format];
  if (!render) {
    throw new Error(`unkown format: ${format}`);
  }
  return render(data);
};
