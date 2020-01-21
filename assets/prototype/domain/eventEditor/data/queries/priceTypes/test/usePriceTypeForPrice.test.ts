import { renderHook } from '@testing-library/react-hooks';

import usePriceTypeForPrice from '../usePriceTypeForPrice';
import { ApolloMockedProvider } from '../../../../context';
import { nodes, edge } from './data';
import { nodes as prices } from '../../prices/test/data';
import useInitPriceTypeTestCache from './useInitPriceTypeTestCache';
import { isFlatFeeSurcharge } from '../../../../../shared/entities/priceTypes/predicates/selectionPredicates';
import { useRelations } from '../../../../../../application/services/apollo/relations';

describe('usePriceTypeForPrice()', () => {
	const wrapper = ApolloMockedProvider();
	const existingPrice = prices[0];
	it('returns null as price type when the cache is empty', () => {
		const { result } = renderHook(() => usePriceTypeForPrice(existingPrice.id), { wrapper });

		expect(result.current).toBeNull();
	});

	it('returns null as price type when the price does not exist and the cache is empty', () => {
		const { result } = renderHook(() => usePriceTypeForPrice('fake-id'), { wrapper });

		expect(result.current).toBeNull();
	});

	it('returns null as price type when the price and default price type do not exist but the cache is NOT empty', () => {
		const nonDefaultPriceTypeNodes = nodes.filter((priceType) => !isFlatFeeSurcharge(priceType));
		const { result } = renderHook(
			() => {
				useInitPriceTypeTestCache({ ...edge, nodes: nonDefaultPriceTypeNodes });
				return usePriceTypeForPrice('fake-id');
			},
			{ wrapper }
		);

		expect(result.current).toBeNull();
	});

	it('returns the default price type when the price does not exist and the cache is NOT empty', () => {
		const defaultPriceType = nodes.filter(isFlatFeeSurcharge)[0];
		const { result } = renderHook(
			() => {
				useInitPriceTypeTestCache();
				return usePriceTypeForPrice('fake-id');
			},
			{ wrapper }
		);

		const { current: cachedDefaultPriceType } = result;

		expect(cachedDefaultPriceType).toEqual(defaultPriceType);

		expect(cachedDefaultPriceType.id).toEqual(defaultPriceType.id);

		expect(cachedDefaultPriceType.name).toEqual(defaultPriceType.name);
	});

	it('returns null as price type when the price exists, has relation with a price type but the cache is empty', () => {
		const { result } = renderHook(
			() => {
				return usePriceTypeForPrice(existingPrice.id);
			},
			{ wrapper }
		);

		expect(result.current).toBeNull();
	});

	it('returns the related price type when the price exists, has relation with the price type and the cache is NOT empty', () => {
		const {
			result: { current: relationsManager },
		} = renderHook(() => useRelations(), { wrapper });

		const relatedPriceTypeId = relationsManager.getRelations({
			entity: 'prices',
			entityId: existingPrice.id,
			relation: 'priceTypes',
		})[0];

		const { result } = renderHook(
			() => {
				useInitPriceTypeTestCache();
				return usePriceTypeForPrice(existingPrice.id);
			},
			{ wrapper }
		);

		const { current: cachedRelatedPriceType } = result;

		expect(cachedRelatedPriceType.id).toEqual(relatedPriceTypeId);
	});
});
