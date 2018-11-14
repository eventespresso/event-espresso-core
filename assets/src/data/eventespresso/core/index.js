/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducers';
import * as selectors from './selectors';
import * as actions from './actions';
import { createEntitySelectors } from './entities';
import { REDUCER_KEY } from './constants';

/**
 * creates specific model entity selectors (getEvents, getDatetimes etc)
 * wrapping the generic selectors.
 * @type {Object<Function>}
 */
const entitySelectors = createEntitySelectors( selectors );

/**
 * Registers store for 'eventespresso/core'.
 */
export default registerStore( REDUCER_KEY, {
	reducer,
	actions,
	selectors: { ...selectors, ...entitySelectors },
} );
