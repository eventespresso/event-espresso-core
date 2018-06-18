/**
 * External imports
 */
import moment from 'moment';
import { isUndefined } from 'lodash';
import PropTypes from 'prop-types';

import {
	getQueryString as baseGetQueryString,
	QUERY_ORDER_DESC,
	ALLOWED_ORDER_VALUES,
} from '../base';

export const STATUS_TYPE_EMAIL = 'email';
export const STATUS_TYPE_EVENT = 'event';
export const STATUS_TYPE_MESSAGE = 'message';
export const STATUS_TYPE_PAYMENT = 'payment';
export const STATUS_TYPE_REGISTRATION = 'registration';
export const STATUS_TYPE_TRANSACTION = 'transaction';

export const nowDateAndTime = moment();

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
export const queryDataTypes = {
	queryData: PropTypes.shape( {
		limit: PropTypes.number,
		orderBy: PropTypes.string,
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
		limit: 25,
		orderBy: 'statusCode',
		order: QUERY_ORDER_DESC,
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
		statusCode: 'STS_code',
	};
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {number} statusType 	ID for type of Status to retrieve
 * @return {string}             The assembled where conditions.
 */
export const whereConditions = ( { statusType } ) => {
	const where = [];
	if ( statusType ) {
		where.push( 'where[STS_type]=' + statusType );
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

