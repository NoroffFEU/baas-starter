const pageTitle = "BaaS frontend starter";

const routes = {
	"/": {
		template: "/src/templates/index.html",
		title: pageTitle,
	},
	"/register": {
		template: "/src/templates/register.html",
		title: `Register | ${pageTitle}`,
	},
	"/admin": {
		template: "/src/templates/admin.html",
		title: `Admin | ${pageTitle}`,
	},
	404: {
		template: "/src/templates/404.html",
		title: `Page not found | ${pageTitle}`,
	},
};

export default routes;
