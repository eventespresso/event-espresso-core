/**
 * External imports
 */
import { isUndefined } from 'lodash';
import PropTypes from 'prop-types';
import { prettyStatus } from '../status';

/**
 * Internal imports
 */
import {
	getQueryString as baseGetQueryString,
	QUERY_ORDER_DESC,
	ALLOWED_ORDER_VALUES,
} from '../base';
import * as checkinStatus from './constants';

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
export const queryDataTypes = {
	forDatetimeId: PropTypes.number,
	forEventId: PropTypes.number,
	forRegistrationId: PropTypes.number,
	forTicketId: PropTypes.number,
	forStatusId: PropTypes.oneOf( checkinStatus.CHECKIN_STATUS_IDS ),
	queryData: PropTypes.shape( {
		limit: PropTypes.number,
		orderBy: PropTypes.oneOf( [
			'CHK_ID',
			'REG_ID',
			'CHK_timestamp',
			'DTT_ID',
		] ),
		order: PropTypes.oneOf( ALLOWED_ORDER_VALUES ),
	} ),
};

export const optionsEntityMap = {
	default: () => {
		return [
			{
				label: prettyStatus(
					checkinStatus.CHECKIN_STATUS_ID.STATUS_CHECKED_OUT
				),
				value: checkinStatus.CHECKIN_STATUS_ID.STATUS_CHECKED_OUT,
			},
			{
				label: prettyStatus(
					checkinStatus.CHECKIN_STATUS_ID.STATUS_CHECKED_IN
				),
				value: checkinStatus.CHECKIN_STATUS_ID.STATUS_CHECKED_IN,
			},
		];
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
		orderBy: 'CHK_timestamp',
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
		timestamp: 'CHK_timestamp',
		id: 'CHK_ID',
	};
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an registrations endpoint request
 *
 * @param {number} forDatetimeId    	ID of Event to retrieve registrations for
 * @param {number} forEventId    ID of Attendee to retrieve registrations for
 * @param {number} forRegistrationId ID of Transaction to retrieve registrations for
 * @param {number} forTicketId 		ID of Ticket to retrieve registrations for
 * @param {string} forStatusId 		ID of Status to retrieve registrations for
 * @return {string}                	The assembled where conditions.
 */
export const whereConditions = ( {
	forDatetimeId = 0,
	forEventId = 0,
	forRegistrationId = 0,
	forTicketId = 0,
	forStatusId = '',
} ) => {
	const where = [];
	forEventId = parseInt( forEventId, 10 );
	if ( forEventId !== 0 && ! isNaN( forEventId ) ) {
		where.push( 'where[Registration.EVT_ID]=' + forEventId );
	}
	forDatetimeId = parseInt( forDatetimeId, 10 );
	if ( forDatetimeId !== 0 && ! isNaN( forDatetimeId ) ) {
		where.push( 'where[DTT_ID]=' + forDatetimeId );
	}
	forRegistrationId = parseInt( forRegistrationId, 10 );
	if ( forRegistrationId !== 0 && ! isNaN( forRegistrationId ) ) {
		where.push( 'where[REG_ID]=' + forRegistrationId );
	}
	forTicketId = parseInt( forTicketId, 10 );
	if ( forTicketId !== 0 && ! isNaN( forTicketId ) ) {
		where.push( 'where[Registration.TKT_ID]=' + forTicketId );
	}
	if ( forStatusId !== '' && forStatusId !== null ) {
		where.push( 'where[CHK_in]=' + forStatusId );
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
