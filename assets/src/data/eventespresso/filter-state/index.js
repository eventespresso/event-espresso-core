/**
 * External dependencies
 */
import { Map } from 'immutable';
import createSelector from 'rememo';
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {};
const SET_FILTER = 'SET_FILTER';

const getState = ( state, context ) => {
	return typeof state[ context ] === 'undefined' ?
		Map() :
		state[ context ];
};

const filterStateReducer = ( state = DEFAULT_STATE, action ) => {
	const { type, context, filter, value } = action;
	if ( type === SET_FILTER ) {
		return {
			...state,
			[ context ]: getState( state, context ).set( filter, value ),
		};
	}
	return state;
};

const setFilter = ( context, filter, value ) => {
	return {
		type: SET_FILTER,
		context,
		filter,
		value,
	};
};

const getFilter = createSelector(
	( state, context, filter, defaultValue ) => {
		return getState( state, context ).get( filter, defaultValue );
	},
	( state, context, filter, defaultValue ) => [
		getState( state, context ).get( filter, defaultValue ),
	]
);

export default registerStore(
	'eventespresso/filter-state',
	{
		reducer: filterStateReducer,
		actions: { setFilter },
		selectors: { getFilter },
	}
);
