import BaseComponent from "../../lib/base-component";

export class Lightbox extends BaseComponent {
    constructor(selector) {
        super(selector);
    }

    init(options) {
        this.addEventListeners({});
        console.log("Lightbox is ready!")
    }
}