import { omit } from 'ramda';

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
	getPriceByGuid,
	getPriceModifiers,
	getTaxes,
} from './index';
import { nodes as prices } from '../../../../../eventEditor/services/apollo/queries/prices/test/data';
import { getGuids } from '@appServices/predicates';

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

describe('getPriceByGuid', () => {
	it('should return price entity with corresponding id', () => {
		const ids = getGuids(prices);
		ids.forEach((id) => {
			const price = getPriceByGuid(prices, id);
			expect(price.id).toBe(id);
		});
	});

	it('should return undefined if there is no corresponding price entity to the specified id', () => {
		const id = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
		const entity = getPriceByGuid(prices, id);
		expect(entity).toBeUndefined();
	});
});

describe('getPriceModifiers', () => {
	it('should return price modifiers', () => {
		const priceModifiers = getPriceModifiers(prices);
		priceModifiers.forEach((priceModifier) => {
			expect(priceModifier.isBasePrice).toBe(false);
		});
	});

	it('should return empty array if there is no price with base price type set to false', () => {
		const updatedPrices = prices.map((price) => ({ ...price, isBasePrice: true }));
		const priceModifiers = getPriceModifiers(updatedPrices);
		expect(priceModifiers).toEqual([]);
	});
});

describe('getTaxes', () => {
	it('should return prices which have isTax prop set to true', () => {
		const result = getTaxes(prices);
		result.forEach((price) => {
			expect(price.isTax).toBe(true);
		});
	});

	it('should return empty array if there is no price with isTax prop set to true', () => {
		const updatedPrices = prices.map((price) => ({ ...price, isTax: false }));
		const result = getTaxes(updatedPrices);
		expect(result).toEqual([]);
	});
});
