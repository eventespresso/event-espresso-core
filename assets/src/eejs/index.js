/**
 * WordPress imports
 */
import * as wpI18n from '@wordpress/i18n';

/**
 * Exported to the `eejs` global.
 */
export { default as data } from './data';

/**
 * Wrapper around wp.i18n functionality so its exposed on the eejs global as
 * eejs.i18n;
 */
export const i18n = wpI18n;
/**
 * exporting routes to a named var
 */
import * as r from './routes';
export const routes = r;

/**
 * Currency Configuration for the default currency from the server
 */
export { currencyConfig as CURRENCY_CONFIG } from './currency_config';

/**
 * Default timezone configuration for the default timezone settings from the
 * server
 */
export { timezoneConfig as TIMEZONE_CONFIG } from './timezone-config';

/**
 * Server locale configuration.
 */
export { locale as SERVER_LOCALE } from './locale';

/**
 * Custom exceptions
 */
export * from './exceptions';

/**
 * Utils
 */
export * from './utils/merge-and-de-duplicate';
export * from './utils/map-reducer';
export * from './utils/convert-to-object-from-map';
export * from './utils/is-generator';
export * from './utils/is-factory';
export * from './utils/is-model-entity';
export * from './utils/is-schema';
