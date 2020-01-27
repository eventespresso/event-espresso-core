import { omit } from 'ramda';

import { Price } from '../../../../../../domain/eventEditor/data/types';
import { isPriceField, isBasePrice, isNotBasePrice, isDiscount, isNotDiscount } from './index';
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
	it('should return true if isBasePrice value is true for each entity', () => {
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
	it('should return true if isBasePrice value is true for each price entity', () => {
		prices.forEach((price) => {
			if (price.isBasePrice === false) {
				expect(isNotBasePrice(price)).toBe(true);
			}
		});
	});

	it('should return false if isBasePrice value is false for each price entity', () => {
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

	it('should return false if isDiscount value is false for each entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === false) {
				expect(isDiscount(price)).toBe(false);
			}
		});
	});
});

describe('isNotDiscount', () => {
	it('should return true if isDiscount value is true for each entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === false) {
				expect(isNotDiscount(price)).toBe(true);
			}
		});
	});

	it('should return false if isDiscount value is false for each entity', () => {
		prices.forEach((price) => {
			if (price.isDiscount === true) {
				expect(isNotDiscount(price)).toBe(false);
			}
		});
	});
});
