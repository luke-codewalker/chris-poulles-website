import { NavbarComponent } from "./components/navbar/navbar";
import { setupComponents } from "./lib/component-manager";
import { HistoryManager } from "./lib/history-manager";
import Modal from "./components/modal/modal";
import { ImageGallery } from "./components/image-gallery/image-gallery";
import { Link } from "./components/link/link.js";
import { Lightbox } from "./components/lightbox/lightbox.js";

window.addEventListener("DOMContentLoaded", () => {
    const historyManager = new HistoryManager();

    setupComponents([
    {
        selector: ".modal",
        componentClass: Modal,
        initOptions: {
            historyManager
        }
    },
    {
        selector: ".navbar",
        componentClass: NavbarComponent
    },
    {
        selector: ".image-gallery",
        componentClass: ImageGallery,
        initOptions: {
            selectors: {
                slider: ".image-gallery__images",
                slide: ".image-gallery__image",
                leftButton: ".image-gallery__button--left",
                rightButton: ".image-gallery__button--right"
            }
        }
    },
    {
        selector: "a.link[data-internal-link]",
        componentClass: Link,
        initOptions: {
            historyManager
        }
    }])

    historyManager.replaceState({}, document.title, window.location.href);
});