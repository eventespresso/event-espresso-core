/**
 * External imports
 */
import moment from 'moment-timezone';
import { isUndefined } from 'lodash';
import PropTypes from 'prop-types';

import {
	getQueryString as baseGetQueryString,
	QUERY_ORDER_DESC,
	ALLOWED_ORDER_VALUES,
	GREATER_THAN,
	GREATER_THAN_AND_EQUAL,
	LESS_THAN_AND_EQUAL,
} from '../base';

export const nowDateAndTime = moment();

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
export const queryDataTypes = {
	queryData: PropTypes.shape( {
		limit: PropTypes.number,
		orderBy: PropTypes.oneOf( [
			'TKT_name',
			'TKT_ID',
			'start_date',
			'end_date',
		] ),
		order: PropTypes.oneOf( ALLOWED_ORDER_VALUES ),
		showExpired: PropTypes.bool,
		month: PropTypes.month,
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
 *   		showExpired: boolean
 *   	}
 *   }
 * }
 */
export const defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'start_date',
		order: QUERY_ORDER_DESC,
		showExpired: false,
	},
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of a ticket.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
export const mapOrderBy = ( orderBy ) => {
	const orderByMap = {
		start_date: 'TKT_start_date',
		end_date: 'TKT_end_date',
	};
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an tickets endpoint request using provided
 * information.
 *
 * @param {boolean} showExpired 	Whether or not to include expired tickets.
 * @param {string} month            Return tickets for the given month. Can be
 *                                	in any month format recognized by moment
 * @param {number} forEventId    	ID of Event to retrieve tickets for
 * @param {number} forDatetimeId    ID of Datetime to retrieve tickets for
 * @return {string}                	The assembled where conditions.
 */
export const whereConditions = ( {
	forEventId = 0,
	forDatetimeId = 0,
	showExpired = false,
	month = 'none',
} ) => {
	const where = [];
	if ( ! showExpired ) {
		where.push(
			'where[TKT_end_date**expired][]=' + GREATER_THAN +
			'&where[TKT_end_date**expired][]=' +
			nowDateAndTime.local().format()
		);
	}
	if ( month && month !== 'none' ) {
		where.push(
			'where[TKT_start_date][]=' + GREATER_THAN_AND_EQUAL +
			'&where[TKT_start_date][]=' +
			moment().month( month ).startOf( 'month' ).local().format()
		);
		where.push(
			'where[TKT_end_date][]=' + LESS_THAN_AND_EQUAL +
			'&where[TKT_end_date][]=' +
			moment().month( month ).endOf( 'month' ).local().format()
		);
	}
	forEventId = parseInt( forEventId, 10 );
	if ( forEventId !== 0 && ! isNaN( forEventId ) ) {
		where.push( 'where[Datetime.Event.EVT_ID]=' + forEventId );
	}
	forDatetimeId = parseInt( forDatetimeId, 10 );
	if ( forDatetimeId !== 0 && ! isNaN( forDatetimeId ) ) {
		where.push( 'where[Datetime.DTT_ID]=' + forDatetimeId );
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
