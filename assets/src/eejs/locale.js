import data from './data';

/**
 * Provided via the data passed along by the server.
 * This data is a configuration object passed along from the server that exposes
 * the default locale settings from the server.
 * @type {{}}
 */
export const { locale = {
	user: 'en',
	site: 'en',
} } = data;
