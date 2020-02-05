import { renderHook } from '@testing-library/react-hooks';

import useTicketPrices from '../useTicketPrices';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitTicketTestCache from './useInitTicketTestCache';
import useInitPriceTestCache from '../../prices/test/useInitPriceTestCache';
import { useRelations } from '../../../../../../../application/services/apollo/relations';

const timeout = 5000; // milliseconds
describe('useTicketPrices', () => {
	const wrapper = ApolloMockedProvider();
	const existingTicket = nodes[0];

	it('returns empty array for ticket prices when the ticket exists and the cache is empty', async () => {
		const { result, waitForValueToChange } = renderHook(() => useTicketPrices(existingTicket.id), { wrapper });

		await waitForValueToChange(() => result.current, { timeout });

		const { current: cachedTicketPrices } = result;

		expect(cachedTicketPrices).toEqual([]);
	});

	it('returns empty array for ticket prices when the ticket does not exist and the cache is empty', async () => {
		const { result, waitForValueToChange } = renderHook(() => useTicketPrices('fake-id'), { wrapper });

		await waitForValueToChange(() => result.current, { timeout });

		const { current: cachedTicketPrices } = result;

		expect(cachedTicketPrices).toEqual([]);
	});

	it('returns empty array for ticket prices when the ticket does not exist and the ticket cache is NOT empty', async () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketPrices('fake-id');
			},
			{ wrapper }
		);

		await waitForValueToChange(() => result.current, { timeout });

		const { current: cachedTicketPrices } = result;

		expect(cachedTicketPrices).toEqual([]);
	});

	it('returns empty array for ticket prices when the ticket exists, has price relations, ticket cache is NOT empty but price cache IS empty', async () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketPrices(existingTicket.id);
			},
			{ wrapper }
		);

		await waitForValueToChange(() => result.current, { timeout });

		const { current: cachedTicketPrices } = result;

		expect(cachedTicketPrices).toEqual([]);
	});

	it('returns an array of related ticket prices when the ticket exists, has price relations and the ticket/price cache is NOT empty', async () => {
		const { result: relationsResult } = renderHook(() => useRelations(), { wrapper });

		const relatedTicketPriceIds = relationsResult.current.getRelations({
			entity: 'tickets',
			entityId: existingTicket.id,
			relation: 'prices',
		});

		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitTicketTestCache();
				useInitPriceTestCache();
				return useTicketPrices(existingTicket.id);
			},
			{ wrapper }
		);
		await waitForValueToChange(() => result.current, { timeout });

		const { current: cachedTicketPrices } = result;

		const cachedTicketPriceIds = cachedTicketPrices.map(({ id }) => id);

		expect(cachedTicketPriceIds.length).toEqual(relatedTicketPriceIds.length);

		expect(cachedTicketPriceIds).toEqual(relatedTicketPriceIds);
	});
});
