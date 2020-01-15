/**
 * Internal dependencies
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
	isFlatFeeSurcharge,
	getDefaultPriceModifierType,
} from './index';
import { nodes as priceTypes } from '../../../../../domain/eventEditor/data/queries/priceTypes/test/data';

describe('isBasePrice & isNotBasePrice', () => {
	it('should return true if priceType is base price', () => {
		priceTypes.forEach((priceType) => {
			expect(isBasePrice(priceType)).toBe(priceType.isBasePrice);
		});
	});

	it('should return true if priceType is NOT base price', () => {
		priceTypes.forEach((priceType) => {
			expect(isNotBasePrice(priceType)).toBe(!priceType.isBasePrice);
		});
	});
});

describe('isDiscount & isNotDiscount', () => {
	it('should return true if priceType is a discount', () => {
		priceTypes.forEach((priceType) => {
			expect(isDiscount(priceType)).toBe(priceType.isDiscount);
		});
	});

	it('should return true if priceType is NOT a discount', () => {
		priceTypes.forEach((priceType) => {
			expect(isNotDiscount(priceType)).toBe(!priceType.isDiscount);
		});
	});
});

describe('isPercent & isNotPercent', () => {
	it('should return true if priceType is percent', () => {
		priceTypes.forEach((priceType) => {
			expect(isPercent(priceType)).toBe(priceType.isPercent);
		});
	});

	it('should return true if priceType is NOT percent', () => {
		priceTypes.forEach((priceType) => {
			expect(isNotPercent(priceType)).toBe(!priceType.isPercent);
		});
	});
});

describe('isTax & isNotTax', () => {
	it('should return true if priceType is tax', () => {
		priceTypes.forEach((priceType) => {
			expect(isTax(priceType)).toBe(priceType.isTax);
		});
	});

	it('should return true if priceType is NOT tax', () => {
		priceTypes.forEach((priceType) => {
			expect(isNotTax(priceType)).toBe(!priceType.isTax);
		});
	});
});

describe('isFlatFeeSurcharge', () => {
	it('should return true if price type is flat fee surcharge', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isBasePrice === false && priceType.isDiscount === false && priceType.isPercent === false) {
				expect(isFlatFeeSurcharge(priceType)).toBe(true);
			}
		});
	});

	it('should return false if price type is NOT flat fee surcharge', () => {
		priceTypes.forEach((priceType) => {
			if (priceType.isBasePrice === true && priceType.isDiscount === false && priceType.isPercent === false) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}

			if (priceType.isBasePrice === false && priceType.isDiscount === true && priceType.isPercent === false) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}

			if (priceType.isBasePrice === false && priceType.isDiscount === false && priceType.isPercent === true) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}
		});
	});
});

describe('getDefaultPriceModifierType', () => {
	it('should get default price type - SURCHARGE', () => {
		const defaultPriceType = getDefaultPriceModifierType(priceTypes);
		expect(defaultPriceType.baseType).toBe(PriceBasetype.SURCHARGE);
	});

	it('should return undefined if we pass an empty array', () => {
		const defaultPriceType = getDefaultPriceModifierType([]);
		expect(defaultPriceType).toBeUndefined();
	});
});
