import routes from "./routes.js";
import * as handlers from "../handlers/index.js";

/**
 * Default function that sets up the routing for the application
 */
export default function router() {
	// Add event listener to the window object for the "popstate" event,
	// which is fired when the user navigates to a different state in the history.
	// The event listener is passed the handleRouteChange function which will
	// handle the change of the route.
	window.addEventListener("popstate", handleRouteChange);
	// Call the handleRouteChange function, essentially on page load
	handleRouteChange();
	// Register event listener to handle click events on navigation links
	handleNavLinks();
}

/**
 * Navigates to a different path and sets the history state object
 * @param {string} path - The path to navigate to
 * @param {object} [state={}] - The state object to store in the history
 */
export const navigate = (path, state = {}) => {
	window.history.pushState(state, "", path);
	// Call the handleRouteChange function to handle the change of the route
	handleRouteChange();
};

/**
 * Handles navigation
 * @event - the click event on the link
 */
const route = (event) => {
	// if event is not passed, use window.event
	event = event || window.event;
	event.preventDefault();
	window.history.pushState({}, "", event.target.href);
	handleRouteChange();
};

/**
 * Handle the route change and render the appropriate template
 */
const handleRouteChange = async () => {
	// Get the current path from the browser location
	const path = window.location.pathname;
	// Get the route object from the routes object or fallback to 404 route
	const route = routes[path] || routes[404];
	// Render the template
	await renderTemplate(route);

	// Add handler functions depending on the path
	switch (path) {
		case "/register":
			// Call the function to handle register form
			handlers.handleRegisterForm();
			return;
	}
};

/**
 * Add event listener on the navigation links
 */
const handleNavLinks = () => {
	document.addEventListener("click", (event) => {
		// we only want to add the event listener when an <a> element is clicked
		if (!event.target.matches("a")) {
			return;
		}
		event.preventDefault();
		route();
	});
};

/**
 * Fetch and render the template
 * @param {object} route - The route object containing the template and title
 * @param {string} route.template - The url of the template file
 * @param {string} route.title - The title of the page
 */
const renderTemplate = async (route) => {
	// Fetch the template
	const html = await fetch(route.template).then((data) => data.text());
	document.querySelector("#app").innerHTML = html;
	document.title = route.title;
};
