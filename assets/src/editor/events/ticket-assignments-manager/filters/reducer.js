/**
 * External imports
 */
import { sprintf } from '@wordpress/i18n';

/**
 * Internal imports
 */
import {
	SHOW_ARCHIVED_DATES,
	SHOW_EXPIRED_DATES,
	SHOW_ARCHIVED_TICKETS,
	SHOW_EXPIRED_TICKETS,
} from './constants';

/**
* @function
* @param {Object} state
* @param {Object} action
* @return {Object} state
*/
const filterReducer = ( state, action ) => {
	switch ( action.type ) {
		case SHOW_ARCHIVED_DATES:
			return { ...state, showArchivedDates: ! state.showArchivedDates };
		case SHOW_EXPIRED_DATES:
			return { ...state, showExpiredDates: ! state.showExpiredDates };
		case SHOW_ARCHIVED_TICKETS:
			return {
				...state,
				showArchivedTickets: ! state.showArchivedTickets,
			};
		case SHOW_EXPIRED_TICKETS:
			return { ...state, showExpiredTickets: ! state.showExpiredTickets };
	}
	throw new Error( sprintf(
		'The "%s" action has no handling implemented',
		action.type
	) );
};

export default filterReducer;
