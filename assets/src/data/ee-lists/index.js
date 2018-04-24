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

const store = registerStore( 'eventespresso/lists', {
	reducers,
	actions,
	selectors,
	resolvers,
} );

export default store;