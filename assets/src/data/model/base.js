import { isUndefined, pickBy } from 'lodash';
import { stringify } from 'querystringify';

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @param { function } whereConditions  A function for prepping the where
 * 										conditions from the queryData.
 * @param { function } mapOrderBy		A function for mapping incoming order_by
 * 										strings to the value needed for the
 * 										query_string.
 * @return { string }  Returns the query string.
 */
export const getQueryString = (
	queryData = {},
	whereConditions = () => null,
	mapOrderBy = orderBy => orderBy,
) => {
	const where = whereConditions( queryData );
	const { limit, order, orderBy } = queryData;
	const queryArgs = {
		limit,
		order,
		order_by: mapOrderBy( orderBy ),
	};
	let queryString = stringify(
		pickBy( queryArgs, value => ! isUndefined( value ) ),
	);
	if ( where ) {
		queryString += '&' + where;
	}
	return queryString;
};

export const QUERY_ORDER_ASC = 'ASC';
export const QUERY_ORDER_DESC = 'DESC';
export const ALLOWED_ORDER_VALUES = [ 'asc', 'desc', 'ASC', 'DESC' ];
