/**
 * External dependencies
 */
import { mapValues } from 'lodash';

/**
 * Internal dependencies
 */
import { endpoints } from './endpoints.js';

/**
 * Provides the default state to be used by our stores.
 */
export const DEFAULT_STATE = mapValues( endpoints,
	function() {
		return [];
	},
);
