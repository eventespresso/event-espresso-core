/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';

import reducer from './reducer.js';
import * as actions from './actions';
import * as selectors from './selectors';

export default registerStore( 'eventespresso/filter-state', {
	reducer,
	actions,
	selectors,
} );
