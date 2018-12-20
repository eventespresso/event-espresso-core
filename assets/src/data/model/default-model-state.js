/**
 * External dependencies
 */
import { mapValues } from 'lodash';
import memoize from 'memize';

/**
 * Internal dependencies
 */
import { endpoints } from './endpoints.js';

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

const getDefaultModelEntitiesObject = memoize(
	() => mapToObjectValues( endpoints )
);

/**
 * Provides the default state to be used by stores containing lists.
 *
 * @type { Object }
 */
export const DEFAULT_LISTS_STATE = mapToObjectValues( endpoints );

/**
 * Provides the default state to be used by the core store.
 *
 * @type {{entities: {}, entityIds: {}, dirty: {}}}
 */
export const DEFAULT_CORE_STATE = {
	entities: {
		...getDefaultModelEntitiesObject(),
	},
	relations: {
		index: {},
		entityMap: {},
	},
	dirty: {
		relations: {
			index: {},
			delete: {},
			add: {},
		},
		trash: {},
		delete: {},
	},
};

/**
 * Provides the default state to be used by the schema store.
 * @type {Object}
 */
export const DEFAULT_SCHEMA_STATE = {
	schema: {
		...getDefaultModelEntitiesObject(),
	},
	factory: {
		...getDefaultModelEntitiesObject(),
	},
	relationEndpoints: {
		...getDefaultModelEntitiesObject(),
	}
};
