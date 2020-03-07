export default class BaseComponent {
  constructor(element) {
    this.componentRoot = element;
  }

  addEventListeners(definitions) {
    Object.keys(definitions).forEach((scope) => {
      let context;
      if (scope === ':self') {
        context = this.componentRoot;
      } else if (scope === 'window') {
        context = window;
      } else if (scope === 'document') {
        context = document;
      } else {
        context = this.componentRoot.querySelector(scope);
      }

      Object.keys(definitions[scope]).forEach((event) => {
        const listener = definitions[scope][event];
        context.addEventListener(event, listener);
      });
    });
  }
}
