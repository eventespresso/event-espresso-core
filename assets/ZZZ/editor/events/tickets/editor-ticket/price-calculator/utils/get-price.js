/**
 * External imports
 */
// import { find, last } from 'lodash';
import memoize from 'memize';
import { normalizeEntityId } from '@eventespresso/helpers';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @param {number|string} priceID
 * @param {BaseEntity[]} prices
 * @return {BaseEntity} price type entity for the given ID
 */
const getPrice = memoize( ( priceID, prices ) => {
	priceID = normalizeEntityId( priceID );
	const price = prices.find( ( p ) => p.id === priceID );
	return isModelEntityOfModel( price, 'price' ) ?
		price :
		prices.slice( -1 )[ 0 ];
} );

export default getPrice;
