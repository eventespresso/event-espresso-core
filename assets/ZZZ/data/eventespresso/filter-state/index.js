/**
 * External dependencies
 */
import { Map } from 'immutable';
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {};
const SET_FILTER = 'SET_FILTER';

/**
 * Returns the portion of the state object for the provided filterBarId
 *
 * @param {Object} state
 * @param {string} filterBarId    filter bar identifier
 * @return {Object} partial state object
 */
const getState = ( state, filterBarId ) => {
	return typeof state[ filterBarId ] === 'undefined' ?
		Map() :
		state[ filterBarId ];
};

/**
 * Resolves actions and returns a new state object
 *
 * @param {Object} state
 * @param {Object} action
 * @param {string} action.type      SET_FILTER constant
 * @param {string} action.filterBarId 	filter bar identifier
 * @param {string} action.filter	filter value identifier
 * @param {string} action.value		filter value
 * @return {Object} new state
 */
const filterStateReducer = ( state = DEFAULT_STATE, action ) => {
	const { type, filterBarId, filter, value } = action;
	let prevState, newState;
	if ( type === SET_FILTER ) {
		prevState = getState( state, filterBarId );
		newState = prevState.set( filter, value );
		if ( prevState !== newState ) {
			return {
				...state,
				[ filterBarId ]: newState,
			};
		}
	}
	return state;
};

/**
 * Returns an action for setting the value of a filter
 *
 * @param {string} filterBarId 	filter bar identifier
 * @param {string} filter 	filter value identifier
 * @param {string} value 	filter value
 * @return {Object} action object
 */
const setFilter = ( filterBarId, filter, value ) => {
	return {
		type: SET_FILTER,
		filterBarId,
		filter,
		value,
	};
};

/**
 * Returns the value for a filter or the default value if not set
 *
 * @param {Object} state
 * @param {string} filterBarId 		filter bar identifier
 * @param {string} filter    	filter value identifier
 * @param {string} defaultValue filter value if not set
 * @return {string} filter value
 */
const getFilter = ( state, filterBarId, filter, defaultValue ) => {
	return getState( state, filterBarId ).get( filter, defaultValue );
};

export default registerStore(
	'eventespresso/filter-state',
	{
		reducer: filterStateReducer,
		actions: { setFilter },
		selectors: { getFilter },
	}
);
