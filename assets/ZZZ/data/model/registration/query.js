/**
 * External imports
 */
import { isUndefined, values } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import {
	getQueryString as baseGetQueryString,
	QUERY_ORDER_DESC,
	ALLOWED_ORDER_VALUES,
} from '../base';
import * as statusModel from '../status/constants';

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
export const queryDataTypes = {
	forEventId: PropTypes.number,
	forAttendeeId: PropTypes.number,
	forTransactionId: PropTypes.number,
	forTicketId: PropTypes.number,
	forStatusId: PropTypes.oneOf( values( statusModel.REGISTRATION_STATUS_ID ) ),
	queryData: PropTypes.shape( {
		limit: PropTypes.number,
		orderBy: PropTypes.oneOf( [
			'REG_ID',
			'REG_date',
		] ),
		order: PropTypes.oneOf( ALLOWED_ORDER_VALUES ),
	} ),
};

export const optionsEntityMap = {
	default: {
		value: 'REG_ID',
		label: 'REG_code',
	},
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
		orderBy: 'reg_date',
		order: QUERY_ORDER_DESC,
	},
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of a registration.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
export const mapOrderBy = ( orderBy ) => {
	const orderByMap = {
		reg_id: 'REG_ID',
		reg_date: 'REG_date',
	};
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an registrations endpoint request
 *
 * @param {number} forEventId    	ID of Event to retrieve registrations for
 * @param {number} forAttendeeId    ID of Attendee to retrieve registrations for
 * @param {number} forTransactionId ID of Transaction to retrieve registrations for
 * @param {number} forTicketId 		ID of Ticket to retrieve registrations for
 * @param {string} forStatusId 		ID of Status to retrieve registrations for
 * @return {string}                	The assembled where conditions.
 */
export const whereConditions = ( {
	forEventId = 0,
	forAttendeeId = 0,
	forTransactionId = 0,
	forTicketId = 0,
	forStatusId = '',
} ) => {
	const where = [];
	forEventId = parseInt( forEventId, 10 );
	if ( forEventId !== 0 && ! isNaN( forEventId ) ) {
		where.push( 'where[EVT_ID]=' + forEventId );
	}
	forAttendeeId = parseInt( forAttendeeId, 10 );
	if ( forAttendeeId !== 0 && ! isNaN( forAttendeeId ) ) {
		where.push( 'where[ATT_ID]=' + forAttendeeId );
	}
	forTransactionId = parseInt( forTransactionId, 10 );
	if ( forTransactionId !== 0 && ! isNaN( forTransactionId ) ) {
		where.push( 'where[TXN_ID]=' + forTransactionId );
	}
	forTicketId = parseInt( forTicketId, 10 );
	if ( forTicketId !== 0 && ! isNaN( forTicketId ) ) {
		where.push( 'where[TKT_ID]=' + forTicketId );
	}
	if ( forStatusId !== '' && forStatusId !== null ) {
		where.push( 'where[STS_ID]=' + forStatusId );
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
