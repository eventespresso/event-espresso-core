/**
 * External dependencies
 */
import { mapValues } from 'lodash';

/**
 * Internal dependencies
 */
import { endpoints } from './endpoints.js';

/**
 * Receives an object map of modelName to endpoint and maps that to a default
 * map of modelName to empty array.
 *
 * @param { Object } modelNameEndpoints
 * @return { Object } An object of { { modelName } : [] }
 */
const mapToArrayValues = modelNameEndpoints => {
	return mapValues( modelNameEndpoints,
		function() {
			return [];
		},
	);
};

/**
 * Receives an object map of modelName to endpoint and maps that to a default
 * map of modelName to empty object.
 *
 * @param { Object } modelNameEndpoints
 * @return { Object } An object of { { modelName } : {} }
 */
const mapToObjectValues = modelNameEndpoints => {
	return mapValues( modelNameEndpoints,
		function() {
			return {};
		},
	);
};

/**
 * Provides the default state to be used by stores containing lists.
 *
 * @type { Object }
 */
export const DEFAULT_LISTS_STATE = mapToArrayValues( endpoints );

/**
 * Provides the default state to be used by the core store.
 *
 * @type {{entities: {}, entityIds: {}, dirty: {}}}
 */
export const DEFAULT_CORE_STATE = {
	entities: {
		...mapToObjectValues( endpoints ),
	},
	entityIds: {
		...DEFAULT_LISTS_STATE,
	},
	dirty: {
		...DEFAULT_LISTS_STATE,
	},
};

