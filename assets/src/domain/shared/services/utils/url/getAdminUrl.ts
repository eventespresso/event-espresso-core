import { ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT } from '@sharedConstants/adminRoutes';

type Props = {
	action?: string;
	adminSiteUrl: string;
	page?: string;
};

/**
 * Return the admin url for a given page and action.
 * @param { string } page  The main ee admin page string
 * @param { string } action This should correspond to the action for the admin
 * 							page.
 * @return { string } A full url for the given arguments.
 */
const getAdminUrl = ({
	action = ADMIN_ROUTE_ACTION_DEFAULT,
	adminSiteUrl,
	page = ADMIN_ROUTES.EVENTS,
}: Props): string => {
	return adminSiteUrl && `${adminSiteUrl}admin.php?page=${page}&action=${action}`;
};

export default getAdminUrl;
