/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducers from './reducers';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';

export const REDUCER_KEY = 'eventespresso/lists';

export default registerStore( REDUCER_KEY, {
	reducer: reducers,
	actions,
	selectors,
	resolvers,
} );
