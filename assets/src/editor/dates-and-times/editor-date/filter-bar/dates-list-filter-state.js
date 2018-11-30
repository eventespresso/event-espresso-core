// filter bar defaults
const initialState = {
	show: 'active-upcoming',
	sort: 'chronologically',
	display: 'start',
	description: 'excerpt',
	venue: true,
};

// action constants
const SET_DISPLAY = Symbol( 'SET_DISPLAY' );
const SET_SHOW = Symbol( 'SET_SHOW' );
const SET_SORT = Symbol( 'SET_SORT' );

/**
 * Returns an action for setting the value for the "display" state property
 *
 * @param {string} display
 * @return {Object} SET_DISPLAY action
 */
const setDisplay = ( display ) => {
	return {
		type: SET_DISPLAY,
		payload: { display: display },
	};
};

/**
 * Returns an action for setting the value for the "show" state property
 *
 * @param {string} show
 * @return {Object} SET_SHOW action
 */
const setShow = ( show ) => {
	return {
		type: SET_SHOW,
		payload: { show: show },
	};
};

/**
 * Returns an action for setting the value
 * for the "sort" state property to "list"
 *
 * @param {string} sort
 * @return {Object} SET_SORT action
 */
const setSort = ( sort ) => {
	return {
		type: SET_SORT,
		payload: { sort: sort },
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
		case SET_DISPLAY :
		case SET_SHOW :
		case SET_SORT :
			return { ...state, ...action.payload };
	}
	return state;
};

const handler = {
	setters: {
		setDisplay,
		setShow,
		setSort,
	},
	reducer: filterStateReducer,
};

const datesListFilterState = {
	initialState,
	handler,
};

export default datesListFilterState;
