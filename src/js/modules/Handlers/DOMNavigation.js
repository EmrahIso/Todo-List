const DOMNavigation = (function() {

    // Toggle mobile navigation

    const navigationBtnEl = document.querySelector("button[data-navigation-status]");

    const toggleNavigationBtnClickEventHandler = (e) => {

        const dateNavigationEl = document.querySelector("[data-sort-projects]");

        const projectNavigationEl = document.querySelector("[data-nav-projects]");

        const projectFormEl = document.querySelector("[data-project-form]");

        if(navigationBtnEl.getAttribute("data-navigation-status") !== "opened") {
            // Show both navigation

            navigationBtnEl.querySelector("span").style.cssText = "opacity:0;";
            navigationBtnEl.setAttribute("data-navigation-status", "opened");

            dateNavigationEl.style.display = "block";
            projectNavigationEl.style.display = "block";
            projectFormEl.style.cssText = "display: grid;transition: 0.3s;opacity: 1;pointer-events: all;visibility: visible;height: auto;transform: scaleY(1);";
        } else {
            // Close both navigation

            navigationBtnEl.querySelector("span").style.cssText = "opacity:1;";
            navigationBtnEl.setAttribute("data-navigation-status", "closed");

            dateNavigationEl.style.display = "none";
            projectNavigationEl.style.display = "none";
            projectFormEl.style.cssText = "display: none;transition: 0.3s;opacity: 0;pointer-events: none;visibility: hidden;height: auto;transform: scaleY(.5);";
        }
    }

    return {
        navigationBtnEl,
        toggleNavigationBtnClickEventHandler
    }

})()

export { DOMNavigation }