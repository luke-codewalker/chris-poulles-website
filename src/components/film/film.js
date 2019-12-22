import BaseComponent from "../../utils/base-component";
export default class Film extends BaseComponent {    
    constructor(selector) {
        super(selector);
        this.history = {};
    }

    onNavigationEvent(e) {                               
        if(window.location.href === window.location.origin + "/" + this.componentRoot.dataset.url) {
            this.componentRoot.classList.add("open");
        } else {
            this.componentRoot.classList.remove("open");
        }
    }

    onCloseButtonClicked() {
        this.history.pushState({}, document.title, "/")
    }

    init(options) {
        this.history = options.historyManager;
        this.history.subscribe((e) => this.onNavigationEvent(e));
        this.addEventListeners({
            ".film__close": {
                "click": (e) => this.onCloseButtonClicked(e)
            }
        })
    }
}