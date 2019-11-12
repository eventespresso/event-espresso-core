/**
 * External imports
 */
import { find, last } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { normalizeEntityId } from '@eventespresso/helpers';

/**
 * @param {number|string} priceTypeId
 * @param {BaseEntity[]} priceTypes
 * @return {BaseEntity} price type entity for the given ID
 */
const getPriceType = ( priceTypeId, priceTypes ) => {
	priceTypeId = normalizeEntityId( priceTypeId );
	const priceType = find( priceTypes, [ 'id', priceTypeId ] );
	return isModelEntityOfModel( priceType, 'price_type' ) ?
		priceType :
		last( priceTypes );
};

export default getPriceType;
