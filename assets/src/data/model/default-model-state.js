/**
 * External dependencies
 */
import { reduce } from 'lodash';

/**
 * Internal dependencies
 */
import { endpoints } from './endpoints.js';

export const DEFAULT_STATE = reduce( endpoints,
	function( defaultState, endpoint, modelName ) {
		defaultState[ modelName ] = [];
	},
	{},
);
