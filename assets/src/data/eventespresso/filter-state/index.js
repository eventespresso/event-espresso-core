/**
 * External dependencies
 */
import { Map } from 'immutable';
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {};
const SET_FILTER = 'SET_FILTER';

/**
 * Returns the portion of the state object for the provided context
 *
 * @param {Object} state
 * @param {string} context    filter bar name
 * @return {Object} partial state object
 */
const getState = ( state, context ) => {
	return typeof state[ context ] === 'undefined' ?
		Map() :
		state[ context ];
};

/**
 * Resolves actions and returns a new state object
 *
 * @param {Object} state
 * @param {Object} action
 * @param {string} action.type      SET_FILTER constant
 * @param {string} action.context 	filter bar name
 * @param {string} action.filter	filter value identifier
 * @param {string} action.value		filter value
 * @return {Object} new state
 */
const filterStateReducer = ( state = DEFAULT_STATE, action ) => {
	const { type, context, filter, value } = action;
	if ( type === SET_FILTER ) {
		const prevState = getState( state, context );
		const newState = prevState.set( filter, value );
		if ( prevState !== newState ) {
			return {
				...state,
				[ context ]: newState,
			};
		}
	}
	return state;
};

/**
 * Returns an action for setting the value of a filter
 *
 * @param {string} context 	filter bar name
 * @param {string} filter 	filter value identifier
 * @param {string} value 	filter value
 * @return {Object} action object
 */
const setFilter = ( context, filter, value ) => {
	return {
		type: SET_FILTER,
		context,
		filter,
		value,
	};
};

/**
 * Returns the value for a filter or the default value if not set
 *
 * @param {Object} state
 * @param {string} context 		filter bar name
 * @param {string} filter    	filter value identifier
 * @param {string} defaultValue filter value if not set
 * @return {string} filter value
 */
const getFilter = ( state, context, filter, defaultValue ) => {
	return getState( state, context ).get( filter, defaultValue );
};

export default registerStore(
	'eventespresso/filter-state',
	{
		reducer: filterStateReducer,
		actions: { setFilter },
		selectors: { getFilter },
	}
);
