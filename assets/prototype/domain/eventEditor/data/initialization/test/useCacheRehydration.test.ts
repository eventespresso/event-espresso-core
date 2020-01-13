import { renderHook } from '@testing-library/react-hooks';

import useCacheRehydration from '../useCacheRehydration';
import useDatetimes from '../../queries/datetimes/useDatetimes';
import useTickets from '../../queries/tickets/useTickets';
import usePriceTypes from '../../queries/priceTypes/usePriceTypes';
import { ApolloMockedProvider } from '../../../context';

describe('useCacheRehydration', () => {
	it('checks for datetimes rehydration', async () => {
		const {
			result: { current: datetimesList },
		} = renderHook(
			() => {
				useCacheRehydration();
				return useDatetimes();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);

		expect(datetimesList.length).toBeGreaterThan(1);

		expect(datetimesList[0]).toHaveProperty('id');

		expect(datetimesList[1]).toHaveProperty('capacity');
	});

	it('checks for tickets rehydration', async () => {
		const {
			result: { current: ticketsList },
		} = renderHook(
			() => {
				useCacheRehydration();
				return useTickets();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);

		expect(ticketsList.length).toBeGreaterThan(1);

		expect(ticketsList[0]).toHaveProperty('id');

		expect(ticketsList[1]).toHaveProperty('description');
	});

	it('checks for price types rehydration', async () => {
		const {
			result: { current: priceTypesList },
		} = renderHook(
			() => {
				useCacheRehydration();
				return usePriceTypes();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);

		expect(priceTypesList.length).toBeGreaterThan(1);

		expect(priceTypesList[0]).toHaveProperty('id');

		expect(priceTypesList[1]).toHaveProperty('name');
	});

	// more tests in currentUser and generalSettings tests
});
