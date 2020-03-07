const mountAndInitComponent = (element, ComponentClass, initOptions = {}) => {
  const mountedComponent = new ComponentClass(element);
  mountedComponent.init(initOptions);
  return mountedComponent;
};

const selectRootElements = (selector, context = document) => context.querySelectorAll(selector);

export default (components) => {
  components.forEach((component) => {
    const rootElements = selectRootElements(component.selector, component.context);
    rootElements.forEach((element) => {
      mountAndInitComponent(element, component.componentClass, component.initOptions);
    });
  });
};
