import BaseComponent from '../../lib/base-component';

export default class Lightbox extends BaseComponent {
  constructor(root) {
    super(root);
    this.fullview = null;
    this.loadingDots = null;
    this.src = '';
    this.img = null;
  }

  openThumbnail() {
    this.fullview.classList.add('open');
    if (!this.img) {
      this.img = document.createElement('img');
      this.img.addEventListener('load', () => {
        this.loadingDots.classList.add('hidden');
        this.fullview.appendChild(this.img);
      });
      this.img.src = this.src;
    }
  }

  closeThumbnail() {
    this.fullview.classList.remove('open');
  }

  init() {
    this.fullview = this.componentRoot.querySelector('.fullview');
    this.loadingDots = this.componentRoot.querySelector('.loading-dots');
    this.src = this.componentRoot.dataset.src;

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
