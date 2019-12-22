import highlightMenuEntries from "./components/navbar/navbar";
import TeaserTile from "./components/teaser-tile/teaser-tile";
import { setupComponents } from "./utils/component-manager";
import { HistoryManager } from "./utils/history-manager";
import Film from "./components/film/film";

window.onload = () => {
    highlightMenuEntries();

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
    }])

    historyManager.replaceState({}, document.title, window.location.href);
};