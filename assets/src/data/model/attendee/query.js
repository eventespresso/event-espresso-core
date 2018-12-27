/**
 * External imports
 */
import { isUndefined } from 'lodash';
import PropTypes from 'prop-types';

import {
	getQueryString as baseGetQueryString,
	QUERY_ORDER_ASC,
	ALLOWED_ORDER_VALUES,
} from '../base';
import { REGISTRATION_STATUS_IDS } from '../registration/constants';

export const orderByMap = {
	id: 'ATT_ID',
	lastNameOnly: 'ATT_lname',
	firstNameOnly: 'ATT_fname',
	firstThenLastName: [ 'ATT_fname', 'ATT_lname' ],
	lastThenFirstName: [ 'ATT_lname', 'ATT_fname' ],
};

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
export const queryDataTypes = {
	forEventId: PropTypes.number,
	forDatetimeId: PropTypes.number,
	forTicketId: PropTypes.number,
	forStatusId: PropTypes.oneOf( REGISTRATION_STATUS_IDS ),
	forRegistrationId: PropTypes.number,
	showGravatar: PropTypes.bool,
	queryData: PropTypes.shape( {
		limit: PropTypes.number,
		orderBy: PropTypes.oneOf( Object.keys( orderByMap ) ),
		order: PropTypes.oneOf( ALLOWED_ORDER_VALUES ),
	} ),
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   	}
 *   }
 * }
 */
export const defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'lastThenFirstName',
		order: QUERY_ORDER_ASC,
	},
};

/**
 * Used to map an orderBy string to the actual value used
 * in a REST query from the context of a attendee.
 *
 * @param {string} 		orderBy
 * @return { string } 	Returns an actual orderBy string
 * 						for the REST query for the provided alias
 */
export const mapOrderBy = ( orderBy ) => {
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an attendees endpoint request
 *
 * @param {number} forEventId    	ID of Event to retrieve attendees for
 * @param {number} forDatetimeId 	ID of Datetime to retrieve attendees for
 * @param {number} forTicketId 		ID of Ticket to retrieve attendees for
 * @param {number} forRegistrationId
 * @param {string} forStatusId 		ID of Status to retrieve attendees for
 * @param {string} showGravatar 	Boolean toggle for whether to display user Gravatar
 * @return {string}                	The assembled where conditions.
 */
export const whereConditions = ( {
	forEventId = 0,
	forDatetimeId = 0,
	forTicketId = 0,
	forRegistrationId = 0,
	forStatusId = 'RAP',
	showGravatar = false,
} ) => {
	const where = [];

	// ensure that entity IDs are integers
	forRegistrationId = parseInt( forRegistrationId, 10 );
	forTicketId = parseInt( forTicketId, 10 );
	forDatetimeId = parseInt( forDatetimeId, 10 );
	forEventId = parseInt( forEventId, 10 );

	// order of priority for provided arguments.
	if ( forRegistrationId !== 0 && ! isNaN( forRegistrationId ) ) {
		where.push( `where[Registration.REG_ID]=${ forRegistrationId }` );
	} else if ( forTicketId !== 0 && ! isNaN( forTicketId ) ) {
		where.push( `where[Registration.Ticket.TKT_ID]=${ forTicketId }` );
	} else if ( forDatetimeId !== 0 && ! isNaN( forDatetimeId ) ) {
		where.push( `where[Registration.Ticket.Datetime.DTT_ID]=${ forDatetimeId }` );
	} else if ( forEventId !== 0 && ! isNaN( forEventId ) ) {
		where.push( `where[Registration.EVT_ID]=${ forEventId }` );
	}

	if ( REGISTRATION_STATUS_IDS.includes( forStatusId ) ) {
		where.push( `where[Registration.Status.STS_ID]=${ forStatusId }` );
	}
	if ( showGravatar === true ) {
		where.push( 'calculate=user_avatar' );
	}
	return where.join( '&' );
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
export const getQueryString = ( queryData = {} ) => {
	queryData = { ...defaultQueryData.queryData, ...queryData };
	return baseGetQueryString( queryData, whereConditions, mapOrderBy );
};
