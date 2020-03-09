/**
 * WordPress imports
 */
import * as wpI18n from '@wordpress/i18n';

/**
 * Wrapper around wp.i18n functionality so its exposed on the eejs global as
 * eejs.i18n;
 */
export const i18n = wpI18n;

/**
 * Custom exceptions
 */
export * from './exceptions';

/**
 * Middle-wares for various libraries
 */
import * as mw from './middlewares';
export const middleWares = mw;
