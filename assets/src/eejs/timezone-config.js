import data from './data';

/**
 * Provided via the data passed along by the server.
 * This data a configuration object passed along from the server that exposes
 * the default timezone settings from the server.
 * @type {{}}
 */
export const { default_timezone: timezoneConfig = {
	pretty: 'UTC',
	string: 'UTC',
	offset: 0,
} } = data;
