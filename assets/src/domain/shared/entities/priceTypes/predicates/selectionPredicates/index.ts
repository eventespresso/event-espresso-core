// @ts-nocheck
import { allPass, filter, find, propEq } from 'ramda';

import { PriceType } from '@edtrServices/apollo/types';

// the following return `true` if price type satisfies predicate
// is a base price ?
export const isBasePrice = propEq('isBasePrice', true);
export const isNotBasePrice = propEq('isBasePrice', false);
// is a discount ?
export const isDiscount = propEq('isDiscount', true);
export const isNotDiscount = propEq('isDiscount', false);
// is a percent based modifier ?
export const isPercent = propEq('isPercent', true);
export const isNotPercent = propEq('isPercent', false);
// is a tax ?
export const isTax = propEq('isTax', true);
export const isNotTax = propEq('isTax', false);

// returns true if supplied price type is a flat fee (dollar) surcharge
export const isFlatFeeSurcharge = allPass([isNotBasePrice, isNotDiscount, isNotPercent]);
// returns array of price types that are NOT base price types
export const getPriceModifiers = (priceTypes: PriceType[]): PriceType[] => filter(isNotBasePrice, priceTypes);

export const getDefaultPriceModifierType = (priceTypes: PriceType[]): PriceType => {
	return find<PriceType>(isFlatFeeSurcharge)(priceTypes);
};
