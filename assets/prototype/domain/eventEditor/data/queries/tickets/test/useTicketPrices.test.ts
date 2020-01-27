import { renderHook } from '@testing-library/react-hooks';

import useTicketPrices from '../useTicketPrices';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { nodes } from './data';
import useInitTicketTestCache from './useInitTicketTestCache';
import useInitPriceTestCache from '../../prices/test/useInitPriceTestCache';
import { useRelations } from '../../../../../../application/services/apollo/relations';

describe('useTicketPrices()', () => {
	const wrapper = ApolloMockedProvider();
	const existingTicket = nodes[0];

	it('returns empty array for ticket prices when the ticket exists and the cache is empty', () => {
		const { result } = renderHook(() => useTicketPrices(existingTicket.id), { wrapper });

		const { current: cachedTicketPrices } = result;

		expect(cachedTicketPrices).toEqual([]);
	});

	it('returns empty array for ticket prices when the ticket does not exist and the cache is empty', () => {
		const { result } = renderHook(() => useTicketPrices('fake-id'), { wrapper });

		const { current: cachedTicketPrices } = result;

		expect(cachedTicketPrices).toEqual([]);
	});

	it('returns empty array for ticket prices when the ticket does not exist and the ticket cache is NOT empty', () => {
		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketPrices('fake-id');
			},
			{ wrapper }
		);

		const { current: cachedTicketPrices } = result;

		expect(cachedTicketPrices).toEqual([]);
	});

	it('returns empty array for ticket prices when the ticket exists, has price relations, ticket cache is NOT empty but price cache IS empty', () => {
		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketPrices(existingTicket.id);
			},
			{ wrapper }
		);

		const { current: cachedTicketPrices } = result;

		expect(cachedTicketPrices).toEqual([]);
	});

	it('returns an array of related ticket prices when the ticket exists, has price relations and the ticket/price cache is NOT empty', () => {
		const {
			result: { current: relationsManager },
		} = renderHook(() => useRelations(), { wrapper });

		const relatedTicketPriceIds = relationsManager.getRelations({
			entity: 'tickets',
			entityId: existingTicket.id,
			relation: 'prices',
		});

		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				useInitPriceTestCache();
				return useTicketPrices(existingTicket.id);
			},
			{ wrapper }
		);

		const { current: cachedTicketPrices } = result;

		const cachedTicketPriceIds = cachedTicketPrices.map(({ id }) => id);

		expect(cachedTicketPriceIds.length).toEqual(relatedTicketPriceIds.length);

		expect(cachedTicketPriceIds).toEqual(relatedTicketPriceIds);
	});
});
