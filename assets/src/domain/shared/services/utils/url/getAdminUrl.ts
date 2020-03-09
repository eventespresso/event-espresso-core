/**
 * Return the admin url for a given page and action.
 * @param { string } page  The main ee admin page string
 * @param { string } action This should correspond to the action for the admin
 * 							page.
 * @return { string } A full url for the given arguments.
 */
const getAdminUrl = (page = ADMIN_ROUTES.EVENTS, action = ADMIN_ROUTE_ACTION_DEFAULT) => {
	return `${ADMIN_URL}admin.php?page=${page}&action=${action}`;
};

export default getAdminUrl;
