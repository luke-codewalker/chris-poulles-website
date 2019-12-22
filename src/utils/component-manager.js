const mountAndInitComponent = (element, componentClass, initOptions = {}) => {
    const mountedComponent = new componentClass(element);
    mountedComponent.init(initOptions);
    return mountedComponent;
}

const selectRootElements = (selector, context = document) => context.querySelectorAll(selector);

export const setupComponents = (components) => {
    for (const component of components) {
        const rootElements = selectRootElements(component.selector, component.context);
        for (const element of rootElements) {
            mountAndInitComponent(element, component.componentClass, component.initOptions)            
        } 
    }
}