import { omit } from 'ramda';

import { Price } from '../../../../../../domain/eventEditor/data/types';
import {
	isPriceField,
	isBasePrice,
	isNotBasePrice,
	isDiscount,
	isNotDiscount,
	isPercent,
	isNotPercent,
	isTax,
	isNotTax,
	getBasePrice,
	getPriceByDbId,
} from './index';
import { nodes as prices } from '../../../../../../domain/eventEditor/data/queries/prices/test/data';

describe('isPriceField', () => {
	it('should return true if field is included in price type', () => {
		prices.forEach((price) => {
			const priceFields = Object.keys(omit(['__typename'], price));
			priceFields.forEach((field) => {
				expect(isPriceField(null, field)).toBe(true);
			});
		});
	});

	it('should return false if field is NOT included in price type', () => {
		const inexistingFields = ['blablaField', 'yetAnotherFieldProp'];

		inexistingFields.forEach((field) => {
			expect(isPriceField(null, field)).toBe(false);
		});
	});
});

describe('isBasePrice', () => {
	it('should return true if isBasePrice value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === true) {
				expect(isBasePrice(price)).toBe(true);
			}
		});
	});

	it('should return false if isBasePrice value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === false) {
				expect(isBasePrice(price)).toBe(false);
			}
		});
	});
});

describe('isNotBasePrice', () => {
	it('should return true if isBasePrice value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === false) {
				expect(isNotBasePrice(price)).toBe(true);
			}
		});
	});

	it('should return false if isBasePrice value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === true) {
				expect(isNotBasePrice(price)).toBe(false);
			}
		});
	});
});

describe('isDiscount', () => {
	it('should return true if isDiscount value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === true) {
				expect(isDiscount(price)).toBe(true);
			}
		});
	});

	it('should return false if isDiscount value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === false) {
				expect(isDiscount(price)).toBe(false);
			}
		});
	});
});

describe('isNotDiscount', () => {
	it('should return true if isDiscount value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === false) {
				expect(isNotDiscount(price)).toBe(true);
			}
		});
	});

	it('should return false if isDiscount value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === true) {
				expect(isNotDiscount(price)).toBe(false);
			}
		});
	});
});

describe('isPercent', () => {
	it('should return true if isPercent value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isPercent === true) {
				expect(isPercent(price)).toBe(true);
			}
		});
	});

	it('should return false if isPercent value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isPercent === false) {
				expect(isPercent(price)).toBe(false);
			}
		});
	});
});

describe('isNotPercent', () => {
	it('should return true if isPercent value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isPercent === false) {
				expect(isNotPercent(price)).toBe(true);
			}
		});
	});

	it('should return false if isPercent value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isPercent === true) {
				expect(isNotPercent(price)).toBe(false);
			}
		});
	});
});

describe('isTax', () => {
	it('should return true if isTax value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isTax === true) {
				expect(isTax(price)).toBe(true);
			}
		});
	});

	it('should return false if isTax value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isTax === false) {
				expect(isTax(price)).toBe(false);
			}
		});
	});
});

describe('isNotTax', () => {
	it('should return true if isTax value is false for each price entity', () => {
		prices.forEach((price) => {
			if (price.isTax === false) {
				expect(isNotTax(price)).toBe(true);
			}
		});
	});

	it('should return false if isTax value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isTax === true) {
				expect(isNotTax(price)).toBe(false);
			}
		});
	});
});

describe('getBasePrice', () => {
	it('should return a price with isBasePrice prop being set to true', () => {
		const basePrice = getBasePrice(prices);
		expect(basePrice.isBasePrice).toBe(true);
	});

	it('should return undefined if there is no base price', () => {
		const updatedPrices = prices.map((price) => ({ ...price, isBasePrice: false }));
		const result = getBasePrice(updatedPrices);
		expect(result).toBeUndefined();
	});
});

describe('getPriceByDbId', () => {
	it('should return price entities with corresponding dbId', () => {
		const dbIds = prices.map(({ dbId }) => dbId);
		dbIds.forEach((dbId) => {
			const price = getPriceByDbId(prices, dbId);
			expect(price.dbId).toBe(dbId);
		});
	});

	it('should return undefined if there is no corresponding entity to the specified dbId', () => {
		const dbId = Number(
			'01100101011101100110010101101110011101000110010101110011011100000111001001100101011100110111001101101111'
		);
		const entity = getPriceByDbId(prices, dbId);
		expect(entity).toBeUndefined();
	});
});
