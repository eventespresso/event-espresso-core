/**
 * External imports
 */
import moment from 'moment-timezone';
import { isUndefined } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
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
			'DTT_name',
			'DTT_ID',
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
 * the context of an event.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
export const mapOrderBy = ( orderBy ) => {
	const orderByMap = {
		start_date: 'DTT_EVT_start',
		end_date: 'DTT_EVT_end',
	};
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {number} forEventId  ID for Event to retrieve datetimes from
 * @param {boolean} showExpired  Whether or not to include expired events.
 * @param {string} month         Return events for the given month.  Can be any
 *                                 in any month format recognized by moment.
 * @return {string}             The assembled where conditions.
 */
export const whereConditions = ( {
	forEventId = 0,
	showExpired = false,
	month = 'none',
} ) => {
	const where = [];
	if ( ! showExpired ) {
		where.push(
			'where[DTT_EVT_end**expired][]=' + GREATER_THAN +
			'&where[DTT_EVT_end**expired][]=' +
			nowDateAndTime.local().format()
		);
	}
	if ( month && month !== 'none' ) {
		where.push(
			'where[DTT_EVT_start][]=' + GREATER_THAN_AND_EQUAL +
			'&where[DTT_EVT_start][]=' +
			moment().month( month ).startOf( 'month' ).local().format()
		);
		where.push(
			'where[DTT_EVT_end][]=' + LESS_THAN_AND_EQUAL +
			'&where[DTT_EVT_end][]=' +
			moment().month( month ).endOf( 'month' ).local().format()
		);
	}
	if ( parseInt( forEventId, 10 ) !== 0 ) {
		where.push( 'where[Event.EVT_ID]=' + forEventId );
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
