/**
 * External imports
 */
import { filter, find, first } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {BaseEntity} price
 * @param {BaseEntity[]} priceTypes
 * @return {BaseEntity} priceType for supplied price
 */
const getPriceTypeForPrice = ( price, priceTypes ) => {
	const priceType = find( priceTypes, [ 'id', price.PRT_ID ] );
	if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
		return priceType;
	}
	return first( filter( priceTypes, ( pt ) => pt.id !== 1 ) );
};

export default getPriceTypeForPrice;
