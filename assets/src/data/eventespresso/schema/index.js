/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { REDUCER_KEY } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';
import reducer from './reducers';
import controls from '../base-controls';
import { createEntitySelectors, createEntityResolvers } from './model';

/**
 * Creates specific model entity selectors (getFactoryForEvent etc)
 * @type {Object<Function>}
 */
const entitySelectors = createEntitySelectors( selectors );

/**
 * Creates specific model entity resolvers (getFactoryForEvent etc)
 * @type {Object<Function>}
 */
const entityResolvers = createEntityResolvers( resolvers );

/**
 * Registration of store for eventespresso/schema.
 */
export default registerStore( REDUCER_KEY, {
	reducer,
	actions,
	controls,
	selectors: { ...selectors, ...entitySelectors },
	resolvers: { ...resolvers, ...entityResolvers },
} );

export const SCHEMA_KEY = REDUCER_KEY;
