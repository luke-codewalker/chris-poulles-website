import BaseComponent from "../../utils/base-component";

export class NavbarComponent extends BaseComponent {
    constructor(root) {
        super(root);
        this.observerOptions = {
            threshold: 0.0,
            rootMargin: "-50% 0px -50% 0px"
        };
        this.navbarLinks = [];
        this.sections = [];
    }

    updateCurrentSection(sections) {
        const currentSection = sections.filter(s => s.isIntersecting)[0].target.id;
        this.navbarLinks.forEach(navbarLink => {
            if (navbarLink.href.split("#")[1] === currentSection) {
                navbarLink.classList.add("current");
            } else {
                navbarLink.classList.remove("current");
            }
        })
    }

    init() {
        this.navbarLinks = this.componentRoot.querySelectorAll("a");
        this.sections = document.querySelectorAll("[data-navbar-section]");
        const intersectionObserver = new IntersectionObserver(entries => this.updateCurrentSection(entries), this.observerOptions);
        this.sections.forEach(node => intersectionObserver.observe(node))
    }
}