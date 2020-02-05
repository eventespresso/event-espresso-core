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
import { PriceBasetype } from '../../../../../../../prototype/domain/eventEditor/data/types';
import { nodes as priceTypes } from '../../../../../../../prototype/domain/eventEditor/data/queries/priceTypes/test/data';

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
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const flatFeeSurcharge = isBasePrice === false && isDiscount === false && isPercent === false;

			expect(isFlatFeeSurcharge(priceType)).toBe(flatFeeSurcharge);
		});
	});

	it('should return false if it is basePrice', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const basePrice = isBasePrice === true && isDiscount === false && isPercent === false;

			if (basePrice === true) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}
		});
	});

	it('should return false if it is dollarDiscount', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const dollarDiscount = isBasePrice === false && isDiscount === true && isPercent === false;

			if (dollarDiscount === true) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}
		});
	});

	it('should return false if it is percentageSurcharge', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const percentageSurcharge = isBasePrice === false && isDiscount === false && isPercent === true;

			if (percentageSurcharge === true) {
				expect(isFlatFeeSurcharge(priceType)).toBe(false);
			}
		});
	});

	it('should return false if it is precentageDiscount', () => {
		priceTypes.forEach((priceType) => {
			const { isBasePrice, isDiscount, isPercent } = priceType;
			const precentageDiscount = isBasePrice === false && isDiscount === true && isPercent === true;

			if (precentageDiscount === true) {
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
