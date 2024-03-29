import BaseComponent from '../../lib/base-component';

export default class Modal extends BaseComponent {
  constructor(selector) {
    super(selector);
    this.history = {};
  }

  onNavigationEvent() {
    if (window.location.href === `${window.location.origin}/${this.componentRoot.dataset.url}`) {
      this.componentRoot.classList.add('open');
    } else {
      this.componentRoot.classList.remove('open');
    }
  }

  onCloseButtonClicked() {
    this.history.pushState({}, document.title, '/');
  }

  init(options) {
    this.history = options.historyManager;
    this.history.subscribe((e) => this.onNavigationEvent(e));
    this.addEventListeners({
      '.modal__close': {
        click: (e) => this.onCloseButtonClicked(e),
      },
    });
  }
}
