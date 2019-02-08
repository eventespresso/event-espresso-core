/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducers';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';
import { createEntitySelectors, createEntityResolvers } from './model';
import { REDUCER_KEY } from './constants';
import controls from '../base-controls';

/**
 * Creates specific model entity selectors (getEvents, getDatetimes etc)
 * @type {Object<Function>}
 */
const entitySelectors = createEntitySelectors( selectors );

/**
 * Creates specific model entity resolvers (getEvents, getDatetimes etc)
 * @type {Object<Function>}
 */
const entityResolvers = createEntityResolvers( resolvers );

/**
 * Registers the store for the 'eventespresso/lists` reducer.
 */
export default registerStore( REDUCER_KEY, {
	reducer,
	actions,
	selectors: { ...selectors, ...entitySelectors },
	resolvers: { ...resolvers, ...entityResolvers },
	controls,
} );
