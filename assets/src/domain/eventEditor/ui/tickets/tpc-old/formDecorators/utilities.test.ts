import { getPriceType, getPriceModifierPriceTypeGuid } from './utilities';
import { nodes as priceTypes } from '../../../../services/apollo/queries/priceTypes/test/data';
import { nodes as prices } from '../../../../services/apollo/queries/prices/test/data';
import { TpcPriceModifier } from '../types';

describe('getPriceType', () => {
	it('should return the correct priceType object', () => {
		const getPriceTypeForPrice = getPriceType(priceTypes);
		// assuming that in test data
		// number of priceType nodes is >= number of price nodes
		prices.forEach((price, index) => {
			// get test priceType
			const testPriceType = priceTypes[index];
			// update priceModifier using test priceType
			const testPriceModifier: TpcPriceModifier = {
				...price,
				priceType: testPriceType.id,
				priceTypeOrder: testPriceType.order,
			};

			const priceType = getPriceTypeForPrice(testPriceModifier);
			expect(priceType).toBe(testPriceType);
		});
	});

	it('should return undefined if there are no priceTypes', () => {
		// pass empty array as priceTypes
		const getPriceTypeForPrice = getPriceType([]);
		prices.forEach((price, index) => {
			const testPriceType = priceTypes[index];
			const testPriceModifier: TpcPriceModifier = {
				...price,
				priceType: testPriceType.id,
				priceTypeOrder: testPriceType.order,
			};

			const priceType = getPriceTypeForPrice(testPriceModifier);
			expect(priceType).toBeUndefined();
		});
	});

	it('should return undefined if the given priceType does not exist', () => {
		const getPriceTypeForPrice = getPriceType(priceTypes);
		prices.forEach((price) => {
			const testPriceModifier: TpcPriceModifier = {
				...price,
				priceType: 'fake-price-type-id',
				priceTypeOrder: 0,
			};

			const priceType = getPriceTypeForPrice(testPriceModifier);
			expect(priceType).toBeUndefined();
		});
	});

	it('should return undefined if priceType is empty', () => {
		const getPriceTypeForPrice = getPriceType(priceTypes);
		const testPrice = prices[0];

		[null, undefined, ''].forEach((priceType) => {
			const testPriceModifier: TpcPriceModifier = {
				...testPrice,
				priceType,
				priceTypeOrder: 0,
			};

			const expectedPriceType = getPriceTypeForPrice(testPriceModifier);
			expect(expectedPriceType).toBeUndefined();
		});
	});

	it('should return undefined if priceModifier is empty', () => {
		const getPriceTypeForPrice = getPriceType(priceTypes);

		[null, undefined].forEach((priceModifier) => {
			const expectedPriceType = getPriceTypeForPrice(priceModifier);
			expect(expectedPriceType).toBeUndefined();
		});
	});

	it('should throw TypeError if priceTypes is null or undefined', () => {
		// pass empty array as priceTypes
		const getPriceTypeForPriceNull = getPriceType(null);
		const getPriceTypeForPriceUndefined = getPriceType(undefined);
		prices.forEach((price, index) => {
			const testPriceType = priceTypes[index];
			const testPriceModifier: TpcPriceModifier = {
				...price,
				priceType: testPriceType.id,
				priceTypeOrder: testPriceType.order,
			};

			const getPriceTypeNull = () => getPriceTypeForPriceNull(testPriceModifier);
			expect(getPriceTypeNull).toThrow(TypeError);

			const getPriceTypeUndefined = () => getPriceTypeForPriceUndefined(testPriceModifier);
			expect(getPriceTypeUndefined).toThrow(TypeError);
		});
	});
});

describe('getPriceModifierPriceTypeGuid', () => {
	it('should return the correct priceType GUID for a given priceModifier', () => {
		const testPrice = prices[0];

		priceTypes.forEach((priceType) => {
			const testPriceModifier: TpcPriceModifier = {
				...testPrice,
				priceType: priceType.id,
				priceTypeOrder: priceType.order,
			};

			const priceTypeGuid = getPriceModifierPriceTypeGuid(testPriceModifier);
			expect(priceTypeGuid).toBe(priceType.id);
		});
	});

	it('should return the passed priceType value even if it is empty', () => {
		const testPrice = prices[0];

		[null, undefined, ''].forEach((priceTypeId) => {
			const testPriceModifier = {
				...testPrice,
				priceType: priceTypeId,
				priceTypeOrder: 0,
			};

			const priceTypeGuid = getPriceModifierPriceTypeGuid(testPriceModifier);
			expect(priceTypeGuid).toBe(priceTypeId);
		});
	});

	it('should return undefined if an empty value is passed as priceModifier', () => {
		[null, undefined].forEach((priceModifier) => {
			const priceTypeGuid = getPriceModifierPriceTypeGuid(priceModifier);
			expect(priceTypeGuid).toBeUndefined();
		});
	});
});
