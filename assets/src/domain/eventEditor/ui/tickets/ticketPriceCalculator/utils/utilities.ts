import { prop } from 'ramda';

import { TpcPriceModifier } from '../types';
import { PriceType } from '@edtrServices/apollo';
import { findEntityByGuid } from '@sharedServices/predicates';

// returns GUID for price modifier's related price type
export const getPriceModifierPriceTypeGuid = (price: TpcPriceModifier) => prop('priceType', price);

// returns price type for supplied price modifier if found in array of price types
export const getPriceType = (priceTypes: PriceType[]) => (price: TpcPriceModifier) => {
	return findEntityByGuid(priceTypes)(getPriceModifierPriceTypeGuid(price));
};

/**
 * returns a copy of price with price type properties applied
 */
export const updatePriceModifier = (price: TpcPriceModifier, priceType?: PriceType): TpcPriceModifier => {
	return {
		...price,
		isBasePrice: priceType.isBasePrice,
		isDiscount: priceType.isDiscount,
		isPercent: priceType.isPercent,
		isTax: priceType.isTax,
		priceType: priceType.id,
		priceTypeOrder: priceType.order,
	};
};
