export default function highlightMenuEntry() {
    const navbarLinks = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("[data-navbar-section]");
    const intersectionObserver = new IntersectionObserver(entries => {
        // if multiple e.g. on load, sort to get current (the one with highest intersection ratio)
        if (entries.length > 1) {
            entries = entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        }
        const node = entries[0];

        // skip the section we are leaving
        if (node.intersectionRatio < 0.5) return;

        navbarLinks.forEach(navbarLink => {
            if (navbarLink.href.split("#")[1] === node.target.id) {
                navbarLink.classList.add("current");
            } else {
                navbarLink.classList.remove("current");
            }
        })
    }, { threshold: 0.5 });
    sections.forEach(node => intersectionObserver.observe(node))
}