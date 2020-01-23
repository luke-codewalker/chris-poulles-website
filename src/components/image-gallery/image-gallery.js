import BaseComponent from "../../lib/base-component";

export class ImageGallery extends BaseComponent {
    constructor(root) {
        super(root);
        this.button = {
            "LEFT": -1,
            "RIGHT": 1
        }
        this.position = 0;
        this.maxClicks = 0;
        this.slider = null;
        this.firstSlide = null;
        this.sliderItemWidth = 0;
        this.slidesCount = 0;
        this.leftButton = null;
        this.rightButton = null;
    }

    onButtonClicked(button) {
        if(button === this.button.LEFT && this.position > 0) {
            this.position -= 1;
        } else if (button === this.button.RIGHT && this.position < this.maxClicks) {
            this.position += 1;
        }        

        this.updateSliderPosition();
        this.updateButtonVisibility();
    }

    updateSliderPosition() {
        this.slider.style.transform = `translateX(-${this.position * this.sliderItemWidth}px)`
    }

    updateButtonVisibility() {
        this.leftButton.style.display = "block";
        this.rightButton.style.display = "block";
        if(this.position === 0) {
            this.leftButton.style.display = "none";
        } else if (this.position === this.maxClicks) {
            this.rightButton.style.display = "none";
        } 
    }

    init(opts) {
        this.slider = this.componentRoot.querySelector(opts.selectors.slider);
        this.firstSlide = this.componentRoot.querySelector(opts.selectors.slide);
        this.sliderItemWidth = this.firstSlide.clientWidth;
                
        const numberOfVisibleSlides = Math.round(this.componentRoot.clientWidth / this.sliderItemWidth);
        this.slidesCount = this.componentRoot.querySelectorAll(opts.selectors.slide).length;        
        this.maxClicks = this.slidesCount - numberOfVisibleSlides;
        this.leftButton = this.componentRoot.querySelector(opts.selectors.leftButton);
        this.rightButton = this.componentRoot.querySelector(opts.selectors.rightButton);

        this.addEventListeners({
            [opts.selectors.leftButton]: {
                "click": () => this.onButtonClicked(this.button.LEFT)
            },
            [opts.selectors.rightButton]: {
                "click": () => this.onButtonClicked(this.button.RIGHT)
            },
            "window": {
                "resize": () => {
                    this.sliderItemWidth = this.firstSlide.clientWidth;        
                    const numberOfVisibleSlides = Math.round(this.componentRoot.clientWidth / this.sliderItemWidth);
                    this.maxClicks = this.slidesCount - numberOfVisibleSlides;
                    this.updateSliderPosition();
                }
            }
        })
    }
}