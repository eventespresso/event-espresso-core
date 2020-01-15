/**
 * External dependencies
 */
import { allPass, find, propEq } from 'ramda';

/**
 * Internal dependencies
 */
import { PriceType } from '../../../../../domain/eventEditor/data/types';

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

export const getDefaultPriceModifierType = (priceTypes: PriceType[]): PriceType | undefined => {
	return find(isFlatFeeSurcharge)(priceTypes);
};
