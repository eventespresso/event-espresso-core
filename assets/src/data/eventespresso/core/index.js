/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal depdencies
 */
import reducer from './reducers';
import * as selectors from './selectors';
import * as actions from './actions';

export default registerStore( 'eventespresso/core', {
	reducer,
	actions,
	selectors,
} );
