import { propEq } from 'ramda';

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

export const isDefaultPriceType = (priceType) => {
	const { baseType, isPercent } = priceType;
	return baseType === 'SURCHARGE' && isPercent;
};
