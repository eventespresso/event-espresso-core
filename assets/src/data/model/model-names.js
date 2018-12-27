/**
 * Internal imports
 */
import { primaryKeys } from './primary-keys.js';

/**
 * External imports
 */
import { keys } from 'lodash';

/**
 * Returns an array of model names currently exposed for REST API request.
 */
export const MODEL_NAMES = keys( primaryKeys );

