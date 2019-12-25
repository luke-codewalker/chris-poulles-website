import { NavbarComponent } from "./components/navbar/navbar";
import TeaserTile from "./components/teaser-tile/teaser-tile";
import { setupComponents } from "./utils/component-manager";
import { HistoryManager } from "./utils/history-manager";
import Film from "./components/film/film";
import { ImageGallery } from "./components/image-gallery/image-gallery";

window.addEventListener("DOMContentLoaded", () => {
    const historyManager = new HistoryManager();

    setupComponents([{
        selector: "a.teaser-tile",
        componentClass: TeaserTile,
        initOptions: {
            historyManager
        }
    },
    {
        selector: ".film",
        componentClass: Film,
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
    }])

    historyManager.replaceState({}, document.title, window.location.href);
});