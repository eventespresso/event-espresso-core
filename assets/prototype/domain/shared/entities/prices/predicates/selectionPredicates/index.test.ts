import { omit } from 'ramda';

import { Price } from '../../../../../../domain/eventEditor/data/types';
import { isPriceField, isBasePrice } from './index';
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
			if (price.isBasePrice) {
				expect(isBasePrice(price)).toBe(true);
			}
		});
	});

	it('should return false if isBasePrice value is false for each entity', () => {
		prices.forEach((price) => {
			if (!price.isBasePrice) {
				expect(isBasePrice(price)).toBe(false);
			}
		});
	});
});
