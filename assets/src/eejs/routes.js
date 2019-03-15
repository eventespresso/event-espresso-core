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
export const ADMIN_ROUTES = {
	EVENTS: 'espresso_events',
	REGISTRATIONS: 'espresso_registrations',
	TRANSACTIONS: 'espresso_transactions',
	MESSAGES: 'espresso_messages',
	PRICES: 'pricing',
	REGISTRATION_FORMS: 'registration_form',
	VENUES: 'espresso_venues',
	GENERAL_SETTINGS: 'espresso_general_settings',
	PAYMENT_METHODS: 'espresso_payment_settings',
	EXTENSIONS_AND_SERVICES: 'espresso_packages',
	MAINTENANCE: 'espresso_maintenance',
	HELP_AND_SUPPORT: 'espresso_support',
	ABOUT: 'espresso_about',
};

/**
 * The string used to indicate the 'default' action route for all Event Espresso
 * admin pages.
 *
 * @type { string }
 */
export const ADMIN_ROUTE_ACTION_DEFAULT = 'default';

/**
 * A list of all admin route actions for Event Espresso admin pages.
 * Note: currently this list only includes display actions (not processing
 * actions).
 *
 * @type { { string: { string: string } } }
 */
export const ADMIN_ROUTE_ACTIONS = {
	EVENTS: {
		OVERVIEW: ADMIN_ROUTE_ACTION_DEFAULT,
		CATEGORY_LIST: 'category_list',
		TEMPLATES: 'template_settings',
		DEFAULT_SETTINGS: 'default_event_settings',
		DEFAULT_TICKETS: 'ticket_list_table',
	},
	REGISTRATIONS: {
		OVERVIEW: ADMIN_ROUTE_ACTION_DEFAULT,
		EVENT_CHECKIN: 'event_registrations',
		CONTACT_LIST: 'contact_list',
		REPORTS: 'reports',
	},
	TRANSACTIONS: {
		OVERVIEW: ADMIN_ROUTE_ACTION_DEFAULT,
		REPORTS: 'reports',
	},
	MESSAGES: {
		MESSAGE_ACTIVITY: ADMIN_ROUTE_ACTION_DEFAULT,
		DEFAULT_MESSAGE_TEMPLATES: 'global_mtps',
		CUSTOM_MESSAGE_TEMPLATES: 'custom_mtps',
		SETTINGS: 'settings',
	},
	PRICES: {
		DEFAULT_PRICING: ADMIN_ROUTE_ACTION_DEFAULT,
		PRICE_TYPES: 'price_types',
		TAX_SETTINGS: 'tax_settings',
	},
	FORMS: {
		QUESTIONS: ADMIN_ROUTE_ACTION_DEFAULT,
		QUESTION_GROUPS: 'question_groups',
		REG_FORM_SETTINGS: 'view_reg_form_settings',
	},
	VENUES: {
		OVERVIEW: ADMIN_ROUTE_ACTION_DEFAULT,
		CATEGORIES: 'category_list',
		GOOGLE_MAPS: 'google_map_settings',
	},
	SETTINGS: {
		YOUR_ORGANIZATION: ADMIN_ROUTE_ACTION_DEFAULT,
		CRITICAL_PAGES: 'critical_pages',
		ADMIN_OPTIONS: 'admin_option_settings',
		COUNTRIES: 'country_settings',
		PRIVACY_SETTINGS: 'privacy_settings',
	},
	PAYMENT_METHODS: {
		PAYMENT_METHODS: ADMIN_ROUTE_ACTION_DEFAULT,
		SETTINGS: 'payment_settings',
		LOGS: 'payment_log',
	},
	MAINTENANCE: {
		MAINTENANCE: ADMIN_ROUTE_ACTION_DEFAULT,
		RESET_OR_DELETE_DATA: 'data_reset',
		DATETIME_UTILITIES: 'datetime_tools',
		SYSTEM_INFORMATION: 'system_status',
	},
	SUPPORT: {
		SUPPORT: ADMIN_ROUTE_ACTION_DEFAULT,
		FAQ: 'faq',
		DEVELOPERS: 'developers',
		SHORTCODES: 'shortcodes',
	},
	ABOUT: {
		WHATS_NEW: ADMIN_ROUTE_ACTION_DEFAULT,
		ABOUT: 'overview',
		CREDITS: 'credits',
		REVIEWS: 'reviews',
	},
};

/**
 * Return the admin url for a given page and action.
 * @param { string } page  The main ee admin page string
 * @param { string } action This should correspond to the action for the admin
 * 							page.
 * @return { string } A full url for the given arguments.
 */
export const getAdminUrl = (
	page = ADMIN_ROUTES.EVENTS,
	action = ADMIN_ROUTE_ACTION_DEFAULT
) => {
	return `${ ADMIN_URL }?admin.php&page=${ page }&action=${ action }`;
};
