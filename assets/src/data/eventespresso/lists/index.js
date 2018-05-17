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

export default registerStore( 'eventespresso/lists', {
	reducers,
	actions,
	selectors,
	resolvers,
} );
