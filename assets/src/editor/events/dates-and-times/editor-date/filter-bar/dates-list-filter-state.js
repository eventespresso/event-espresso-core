// filter bar defaults
const initialState = {
	showDates: 'active-upcoming',
	sortDates: 'chronologically',
	displayDates: 'start',
	dateDescription: 'excerpt',
	showDateVenue: true,
	datesPerPage: 6,
	datesView: 'grid',
};

// action constants
const SET_SHOW_DATES = Symbol( 'SET_SHOW_DATES' );
const SET_SORT_DATES = Symbol( 'SET_SORT_DATES' );
const SET_DISPLAY_DATES = Symbol( 'SET_DISPLAY_DATES' );
const SET_DATES_PER_PAGE = Symbol( 'SET_DATES_PER_PAGE' );
const SET_DATES_VIEW = Symbol( 'SET_DATES_VIEW' );

/**
 * Returns an action for setting the value for the "showDates" state property
 *
 * @param {string} showDates
 * @return {Object} SET_SHOW action
 */
const setShowDates = ( showDates ) => {
	return {
		type: SET_SHOW_DATES,
		payload: { showDates: showDates },
	};
};

/**
 * Returns an action for setting the value
 * for the "sortDates" state property to "list"
 *
 * @param {string} sortDates
 * @return {Object} SET_SORT action
 */
const setSortDates = ( sortDates ) => {
	return {
		type: SET_SORT_DATES,
		payload: { sortDates: sortDates },
	};
};

/**
 * Returns an action for setting the value for the "displayDates" state property
 *
 * @param {string} displayDates
 * @return {Object} SET_DISPLAY action
 */
const setDisplayDates = ( displayDates ) => {
	return {
		type: SET_DISPLAY_DATES,
		payload: { displayDates: displayDates },
	};
};

/**
 * Returns an action for setting the value for the "datesPerPage" state property
 *
 * @param {number|string} datesPerPage
 * @return {Object} SET_PER_PAGE action
 */
const setDatesPerPage = ( datesPerPage ) => {
	datesPerPage = datesPerPage ? datesPerPage : initialState.datesPerPage;
	return {
		type: SET_DATES_PER_PAGE,
		payload: { datesPerPage: parseInt( datesPerPage ) },
	};
};

/**
 * Returns an action for setting the value
 * for the "datesView" state property to "list"
 *
 * @return {Object} SET_VIEW action
 */
const setDatesListView = () => {
	return {
		type: SET_DATES_VIEW,
		payload: { datesView: 'list' },
	};
};

/**
 * Returns an action for setting the value
 * for the "datesView" state property to "grid"
 *
 * @return {Object} SET_VIEW action
 */
const setDatesGridView = () => {
	return {
		type: SET_DATES_VIEW,
		payload: { datesView: 'grid' },
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
		case SET_SHOW_DATES :
		case SET_SORT_DATES :
		case SET_DISPLAY_DATES :
		case SET_DATES_PER_PAGE :
		case SET_DATES_VIEW :
			return { ...state, ...action.payload };
	}
	return state;
};

const handler = {
	setters: {
		setShowDates,
		setSortDates,
		setDisplayDates,
		setDatesPerPage,
		setDatesListView,
		setDatesGridView,
	},
	reducer: filterStateReducer,
};

export { initialState, handler };

const datesListFilterState = { initialState, handler };

export default datesListFilterState;
