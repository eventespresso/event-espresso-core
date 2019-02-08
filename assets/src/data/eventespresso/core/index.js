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
import * as resolvers from './resolvers';
import {
	selectors as modelSelectors,
	actions as modelActions,
	resolvers as modelResolvers,
} from './model';
import { REDUCER_KEY } from './constants';
import controls from '../base-controls';

/**
 * Registers store for 'eventespresso/core'.
 */
export default registerStore( REDUCER_KEY, {
	reducer,
	actions: { ...actions, ...modelActions },
	selectors: { ...selectors, ...modelSelectors },
	resolvers: { ...resolvers, ...modelResolvers },
	controls,
} );
