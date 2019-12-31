import { propEq } from 'ramda';
import { PriceType, PriceBasetype } from '../../../eventEditor/data/types';

type PriceTypePredicate = (obj: PriceType) => boolean;

// the following return `true` if price type satisfies predicate
// is a base price ?
export const isBasePrice: PriceTypePredicate = propEq('isBasePrice', true);
export const isNotBasePrice: PriceTypePredicate = propEq('isBasePrice', false);
// is a discount ?
export const isDiscount: PriceTypePredicate = propEq('isDiscount', true);
export const isNotDiscount: PriceTypePredicate = propEq('isDiscount', false);
// is a percent based modifier ?
export const isPercent: PriceTypePredicate = propEq('isPercent', true);
export const isNotPercent: PriceTypePredicate = propEq('isPercent', false);
// is a tax ?
export const isTax: PriceTypePredicate = propEq('isTax', true);
export const isNotTax: PriceTypePredicate = propEq('isTax', false);

export const isDefaultPriceType: PriceTypePredicate = ({ baseType, isPercent }: PriceType): boolean =>
	baseType === PriceBasetype.SURCHARGE && isPercent;
