import { renderHook } from '@testing-library/react-hooks';

import useCacheRehydration from '../useCacheRehydration';
import useDatetimes from '../../queries/datetimes/useDatetimes';
import useTickets from '../../queries/tickets/useTickets';
import usePriceTypes from '../../queries/priceTypes/usePriceTypes';
import { ApolloMockedProvider } from '../../../context/TestContext';

const timeout = 5000; // milliseconds
describe('useCacheRehydration', () => {
	it('checks for datetimes rehydration', async () => {
		const { result: datetimeResult, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return useDatetimes();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		await waitForNextUpdate({ timeout });

		const { current: datetimesList } = datetimeResult;

		expect(datetimesList.length).toBeGreaterThan(1);

		expect(datetimesList[0]).toHaveProperty('id');

		expect(datetimesList[1]).toHaveProperty('capacity');
	});

	it('checks for tickets rehydration', async () => {
		const { result: ticketResult, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return useTickets();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		await waitForNextUpdate({ timeout });

		const { current: ticketsList } = ticketResult;

		expect(ticketsList.length).toBeGreaterThan(1);

		expect(ticketsList[0]).toHaveProperty('id');

		expect(ticketsList[1]).toHaveProperty('description');
	});

	it('checks for price types rehydration', async () => {
		const { result: priceResult, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return usePriceTypes();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		await waitForNextUpdate({ timeout });

		const { current: priceTypesList } = priceResult;

		expect(priceTypesList.length).toBeGreaterThan(1);

		expect(priceTypesList[0]).toHaveProperty('id');

		expect(priceTypesList[1]).toHaveProperty('name');
	});

	// more tests in currentUser and generalSettings tests
});
