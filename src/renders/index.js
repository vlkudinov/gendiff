import defaultRender from './default';

const renders = {
  default: defaultRender,
};

export default format => (data) => {
  const render = renders[format];
  if (!render) {
    throw new Error(`unkown format: ${format}`);
  }
  return render(data);
};
