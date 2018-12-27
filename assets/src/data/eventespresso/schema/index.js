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
import controls from './controls';

/**
 * Registration of store for schema/factory.
 */
export default registerStore( REDUCER_KEY, {
	reducer,
	actions,
	controls,
	selectors,
	resolvers,
} );

export const SCHEMA_KEY = REDUCER_KEY;
