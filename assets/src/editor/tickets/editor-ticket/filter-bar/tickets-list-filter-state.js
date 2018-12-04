// filter bar defaults
const initialState = {
	showTickets: 'on-sale-and-pending',
	sortTickets: 'chronologically',
	displayTicketDate: 'start',
	ticketDescription: 'excerpt',
	ticketsPerPage: 6,
	ticketsView: 'grid',
};

// action constants
const SET_TICKETS_PER_PAGE = Symbol( 'SET_TICKETS_PER_PAGE' );
const SET_TICKETS_VIEW = Symbol( 'SET_TICKETS_VIEW' );
const SET_DISPLAY_TICKET_DATE = Symbol( 'SET_DISPLAY_TICKET_DATE' );
const SET_SHOW_TICKETS = Symbol( 'SET_SHOW_TICKETS' );
const SET_SORT_TICKETS = Symbol( 'SET_SORT_TICKETS' );

/**
 * Returns an action for setting the value
 * for the "displayTicketDate" state property
 *
 * @param {string} displayTicketDate
 * @return {Object} SET_DISPLAY action
 */
const setDisplayTicketDate = ( displayTicketDate ) => {
	return {
		type: SET_DISPLAY_TICKET_DATE,
		payload: { displayTickets: displayTicketDate },
	};
};

/**
 * Returns an action for setting the value for the "showTickets" state property
 *
 * @param {string} showTickets
 * @return {Object} SET_SHOW action
 */
const setShowTickets = ( showTickets ) => {
	return {
		type: SET_SHOW_TICKETS,
		payload: { showTickets: showTickets },
	};
};

/**
 * Returns an action for setting the value
 * for the "sortTickets" state property to "list"
 *
 * @param {string} sortTickets
 * @return {Object} SET_SORT action
 */
const setSortTickets = ( sortTickets ) => {
	return {
		type: SET_SORT_TICKETS,
		payload: { sortTickets: sortTickets },
	};
};

/**
 * Returns an action for setting the value
 * for the "ticketsPerPage" state property
 *
 * @param {number|string} ticketsPerPage
 * @return {Object} SET_PER_PAGE action
 */
const setTicketsPerPage = ( ticketsPerPage ) => {
	ticketsPerPage = ticketsPerPage ?
		ticketsPerPage :
		initialState.ticketsPerPage;
	return {
		type: SET_TICKETS_PER_PAGE,
		payload: { ticketsPerPage: parseInt( ticketsPerPage ) },
	};
};

/**
 * Returns an action for setting the value
 * for the "ticketsView" state property to "list"
 *
 * @return {Object} SET_VIEW action
 */
const setTicketsListView = () => {
	return {
		type: SET_TICKETS_VIEW,
		payload: { ticketsView: 'list' },
	};
};

/**
 * Returns an action for setting the value
 * for the "ticketsView" state property to "grid"
 *
 * @return {Object} SET_VIEW action
 */
const setTicketsGridView = () => {
	return {
		type: SET_TICKETS_VIEW,
		payload: { ticketsView: 'grid' },
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
		case SET_TICKETS_PER_PAGE :
		case SET_TICKETS_VIEW :
		case SET_DISPLAY_TICKET_DATE :
		case SET_SHOW_TICKETS :
		case SET_SORT_TICKETS :
			return { ...state, ...action.payload };
	}
	return state;
};

const handler = {
	setters: {
		setShowTickets,
		setSortTickets,
		setDisplayTicketDate,
		setTicketsPerPage,
		setTicketsListView,
		setTicketsGridView,
	},
	reducer: filterStateReducer,
};

export { initialState, handler };

const ticketsListFilterState = { initialState, handler };

export default ticketsListFilterState;
