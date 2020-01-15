/**
 * ?Internal dependencies
 */
import { PriceBasetype } from '../../../../../domain/eventEditor/data/types';
import {
	isBasePrice,
	isNotBasePrice,
	isDiscount,
	isNotDiscount,
	isPercent,
	isNotPercent,
	isTax,
	isNotTax,
	getDefaultPriceModifierType,
} from './index';
import { nodes as priceTypes } from '../../../../../domain/eventEditor/data/queries/priceTypes/test/data';

describe('isBasePrice & isNotBasePrice', () => {
	it('should return true if priceType is base price', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isBasePrice === true) {
				expect(isBasePrice(priceType)).toBe(true);
			}
		});
	});

	it('should return true if priceType is NOT base price', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isBasePrice === false) {
				expect(isNotBasePrice(priceType)).toBe(true);
			}
		});
	});
});

describe('isDiscount & isNotDiscount', () => {
	it('should return true if priceType is a discount', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isDiscount === true) {
				expect(isDiscount(priceType)).toBe(true);
			}
		});
	});

	it('should return true if priceType is NOT a discount', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isDiscount === false) {
				expect(isNotDiscount(priceType)).toBe(true);
			}
		});
	});
});

describe('isPercent & isNotPercent', () => {
	it('should return true if priceType is percent', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isPercent === true) {
				expect(isPercent(priceType)).toBe(true);
			}
		});
	});

	it('should return true if priceType is NOT percent', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isPercent === false) {
				expect(isNotPercent(priceType)).toBe(true);
			}
		});
	});
});

describe('isTax & isNotTax', () => {
	it('should return true if priceType is tax', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isTax === true) {
				expect(isTax(priceType)).toBe(true);
			}
		});
	});

	it('should return true if priceType is NOT tax', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isTax === false) {
				expect(isNotTax(priceType)).toBe(true);
			}
		});
	});
});

describe('getDefaultPriceType', () => {
	it('should get default price type - SURCHARGE', () => {
		const defaultPriceType = getDefaultPriceModifierType(priceTypes);
		expect(defaultPriceType.baseType).toBe(PriceBasetype.SURCHARGE);
	});

	it('should return undefined if we pass an empty array', () => {
		const defaultPriceType = getDefaultPriceModifierType([]);
		expect(defaultPriceType).toBeUndefined();
	});
});
