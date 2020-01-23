import BaseComponent from "../../utils/base-component";

export class Link extends BaseComponent {
    constructor(selector) {
        super(selector);
        this.history = {};
    }

    onLinkClicked(e) {
        e.preventDefault();
        this.history.pushState({}, document.title, e.target.href)
    }

    init(options) {
        this.history = options.historyManager;
        this.addEventListeners({
            ":self": {
                "click": e => this.onLinkClicked(e)
            }
        })
    }
}