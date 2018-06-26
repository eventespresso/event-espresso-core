/**
 * External imports
 */
import { isUndefined } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import {
	getQueryString as baseGetQueryString,
	QUERY_ORDER_ASC,
	ALLOWED_ORDER_VALUES,
} from '../base';

export const MODEL_NAME = 'status';

export const STATUS_TYPE_ANY = 'ANY';
export const STATUS_TYPE_EMAIL = 'email';
export const STATUS_TYPE_EVENT = 'event';
export const STATUS_TYPE_MESSAGE = 'message';
export const STATUS_TYPE_PAYMENT = 'payment';
export const STATUS_TYPE_REGISTRATION = 'registration';
export const STATUS_TYPE_TRANSACTION = 'transaction';

const map = {};
map[ MODEL_NAME ] = {
	value: 'STS_ID',
	label: 'STS_code',
};
export const optionsEntityMap = map;

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
export const queryDataTypes = {
	queryData: PropTypes.shape( {
		statusType: PropTypes.oneOf( [
			STATUS_TYPE_EMAIL,
			STATUS_TYPE_EVENT,
			STATUS_TYPE_MESSAGE,
			STATUS_TYPE_PAYMENT,
			STATUS_TYPE_REGISTRATION,
			STATUS_TYPE_TRANSACTION,
		] ),
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
 * 			statusType: string,
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
		order: QUERY_ORDER_ASC,
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

