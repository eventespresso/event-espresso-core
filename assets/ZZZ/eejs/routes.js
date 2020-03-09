/**
 * Internal imports
 */
import data from './data';

/**
 * Provided via the data passed along by the server.
 * This data has to do with any paths/route information passed along from the
 * server.
 *
 * @type { {} }
 */
const { paths = {} } = data;

/**
 * The base url for the site this js is loaded on.
 * eg. 'https://mysite.com/'
 * @type { string }
 */
export const SITE_URL = paths.site_url || '';

/**
 * The base admin url for the site this js is loaded on.
 * eg. 'https://mysite.com/wp-admin/
 * @type { string }
 */
export const ADMIN_URL = paths.admin_url || '';

/**
 * A list of all main Event Espresso admin routes.
 *
 * @type { { string: string } }
 */

/**
 * Return the admin url for a given page and action.
 * @param { string } page  The main ee admin page string
 * @param { string } action This should correspond to the action for the admin
 * 							page.
 * @return { string } A full url for the given arguments.
 */
export const getAdminUrl = (page = ADMIN_ROUTES.EVENTS, action = ADMIN_ROUTE_ACTION_DEFAULT) => {
	return `${ADMIN_URL}admin.php?page=${page}&action=${action}`;
};
