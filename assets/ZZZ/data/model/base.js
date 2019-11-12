/**
 * External imports
 */
import { isArray, isUndefined } from 'lodash';

export const QUERY_ORDER_ASC = 'ASC';
export const QUERY_ORDER_DESC = 'DESC';
export const ALLOWED_ORDER_VALUES = [ 'asc', 'desc', 'ASC', 'DESC' ];
export const GREATER_THAN = encodeURIComponent( '>' );
export const LESS_THAN = encodeURIComponent( '<' );
export const GREATER_THAN_AND_EQUAL = encodeURIComponent( '>=' );
export const LESS_THAN_AND_EQUAL = encodeURIComponent( '<=' );

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @param { function } whereConditions  A function for prepping the where
 * 										conditions from the queryData.
 * @param { function } mapOrderBy		A function for mapping incoming order_by
 * 										strings to the value needed for the
 * 										query_string.
 * @return { string }  					Returns the query string.
 */
export const getQueryString = (
	queryData = {},
	whereConditions = () => null,
	mapOrderBy = ( orderBy ) => orderBy,
) => {
	const where = whereConditions( queryData );
	const { limit, order, orderBy, defaultWhereConditions } = queryData;
	const queryParams = [];
	if ( ! isUndefined( limit ) ) {
		queryParams.push( `limit=${ limit }` );
	}
	if ( ! isUndefined( defaultWhereConditions ) ) {
		queryParams.push(
			`default_where_conditions=${ defaultWhereConditions }`
		);
	}
	if ( ! isUndefined( mapOrderBy( orderBy ) ) ) {
		if ( isArray( mapOrderBy( orderBy ) ) ) {
			for ( const field of mapOrderBy( orderBy ) ) {
				queryParams.push( `order_by[${ field }]=${ order }` );
			}
		} else {
			queryParams.push( `order=${ order }` );
			queryParams.push( `order_by=${ mapOrderBy( orderBy ) }` );
		}
	}
	let queryString = queryParams.join( '&' );
	if ( where ) {
		queryString += '&' + where;
	}
	return queryString;
};
