import BaseComponent from '../../lib/base-component';

export default class Lightbox extends BaseComponent {
  constructor(root) {
    super(root);
    this.thumbnail = null;
    this.fullview = null;
  }

  openThumbnail() {
    this.fullview.classList.add('open');
  }

  closeThumbnail() {
    this.fullview.classList.remove('open');
  }

  init() {
    this.thumbnail = this.componentRoot.querySelector('.thumbnail');
    this.fullview = this.componentRoot.querySelector('.fullview');

    this.addEventListeners({
      '.thumbnail': {
        click: () => this.openThumbnail(),
      },
      '.fullview__close': {
        click: () => this.closeThumbnail(),
      },
    });
  }
}
