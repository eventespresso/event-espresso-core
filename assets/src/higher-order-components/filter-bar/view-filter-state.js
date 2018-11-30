/**
 * State management for the EntityListFilterBar
 *
 * USAGE:
 *
 * import {
 * 		initialState,
 * 		register,
 * 		viewFilterStateHandler,
 * } from '@event_espresso/higher-order-components';
 *
 * let state = register(
 * 		viewFilterStateHandler,
 * 		initialState
 * );
 *
 * // set view
 * state.setListView();
 *
 * // set perPage
 * state.setPerPage( '12' );
 */

// action constants
const SET_PER_PAGE = Symbol( 'SET_PER_PAGE' );
const SET_VIEW = Symbol( 'SET_VIEW' );

const initialState = {
	perPage: 6,
	view: 'grid',
};

/**
 * Returns an action for setting the value for the "perPage" state property
 *
 * @param {number|string} perPage
 * @return {Object} SET_PER_PAGE action
 */
const setPerPage = ( perPage ) => {
	perPage = perPage ? perPage : initialState.perPage;
	return {
		type: SET_PER_PAGE,
		payload: { perPage: parseInt( perPage ) },
	};
};

/**
 * Returns an action for setting the value
 * for the "view" state property to "list"
 *
 * @return {Object} SET_VIEW action
 */
const setListView = () => {
	return {
		type: SET_VIEW,
		payload: { view: 'list' },
	};
};

/**
 * Returns an action for setting the value
 * for the "view" state property to "grid"
 *
 * @return {Object} SET_VIEW action
 */
const setGridView = () => {
	return {
		type: SET_VIEW,
		payload: { view: 'grid' },
	};
};

/**
 * Resolves actions and returns a new state object
 *
 * @param {Object} action
 * @param {Object} state
 * @return {Object} new state
 */
const filterStateReducer = ( action, state = {} ) => {
	switch ( action.type ) {
		case SET_PER_PAGE :
		case SET_VIEW :
			return { ...state, ...action.payload };
	}
	return state;
};

const handler = {
	setters: {
		setGridView,
		setListView,
		setPerPage,
	},
	reducer: filterStateReducer,
};

const viewFilterState = {
	initialState,
	handler,
};

export default viewFilterState;
