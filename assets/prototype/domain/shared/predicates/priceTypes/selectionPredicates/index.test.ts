/**
 * ?Internal dependencies
 */
import { PriceBasetype } from '../../../../../domain/eventEditor/data/types';
import { getDefaultPriceModifierType } from './index';
import { nodes as priceTypes } from '../../../../../domain/eventEditor/data/queries/priceTypes/test/data';

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
