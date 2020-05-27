import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useRelations } from '../../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedTickets } from './data';
import { nodes as datetimes } from '../../../queries/datetimes/test/data';
import { nodes as prices } from '../../../queries/prices/test/data';
import { MutationInput } from '../../../../../../../application/services/apollo/mutations/types';
import useTicketItem from '../../../queries/tickets/useTicketItem';
import useTicketIds from '../../../queries/tickets/useTicketIds';
import { useTicketMutator } from '../';
import { getGuids } from '@appServices/predicates';

const timeout = 5000; // milliseconds
describe('createTicket', () => {
	let testInput: MutationInput = { name: 'New Test Ticket', description: 'New Test Desc' };
	const mockedTicket = mockedTickets.CREATE;

	const datetimeIds = getGuids(datetimes);
	const priceIds = getGuids(prices);

	let mutationMocks = getMutationMocks(testInput, MutationType.Create);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForValueToChange } = renderHook(() => useTicketMutator(), {
			wrapper,
		});

		let mutationData: any;

		act(() => {
			result.current.createEntity(testInput).then(({ data }) => {
				mutationData = data;
			});
		});

		// wait for mutation promise to resolve
		await waitForValueToChange(() => mutationData, { timeout });

		expect(mutationData).toEqual(mockResult.data);
		const pathToName = ['createEspressoTicket', 'espressoTicket', 'name'];

		const nameFromMutationData = path<string>(pathToName, mutationData);
		const nameFromMockData = path<string>(pathToName, mockResult.data);

		expect(nameFromMutationData).toEqual(nameFromMockData);
	});

	it('checks for the mutation data to be same as that in the cache - useTicketItem', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForValueToChange } = renderHook(
			() => ({
				mutator: useTicketMutator(),
				client: useApolloClient(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForValueToChange(() => mutationResult.current, { timeout });

		const cache = mutationResult.current.client.extract();
		const { result: cacheResult, waitForNextUpdate } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return useTicketItem({ id: mockedTicket.id });
			},
			{
				wrapper,
			}
		);

		await waitForNextUpdate({ timeout });

		const cachedTicket = cacheResult.current;

		expect(cachedTicket).toEqual({ ...mockedTicket, ...testInput });
	});

	it('checks for the mutation data to be same as that in the cache - useTicketIds', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: useTicketMutator(),
				client: useApolloClient(),
			}),
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		const cache = mutationResult.current.client.extract();
		const { result: cacheResult, waitForNextUpdate: waitForUpdate } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return useTicketIds();
			},
			{
				wrapper,
			}
		);

		await waitForUpdate({ timeout });

		const cachedTickets = cacheResult.current;

		expect(cachedTickets).toContain(mockedTicket.id);
	});

	it('checks for datetime relation update after mutation', async () => {
		// Add related datetime Ids to the mutation input
		testInput = { ...testInput, datetimes: datetimeIds };

		mutationMocks = getMutationMocks(testInput, MutationType.Create);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: useTicketMutator(),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		// check if ticket is related to all the passed tickets
		const relatedDatetimeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'datetimes',
		});

		expect(datetimeIds.length).toEqual(relatedDatetimeIds.length);

		expect(datetimeIds).toEqual(relatedDatetimeIds);

		// check if all the passed tickets are related to the ticket
		datetimeIds.forEach((ticketId) => {
			const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
				entity: 'datetimes',
				entityId: ticketId,
				relation: 'tickets',
			});

			expect(relatedTicketIds).toContain(mockedTicket.id);
		});
	});

	it('checks for price relation update after mutation', async () => {
		// Add related price Ids to the mutation input
		testInput = { ...testInput, prices: priceIds };

		mutationMocks = getMutationMocks(testInput, MutationType.Create);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: useTicketMutator(),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		// check if ticket is related to all the passed datetimes
		const relatedPriceIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'prices',
		});

		expect(priceIds.length).toEqual(relatedPriceIds.length);

		expect(priceIds).toEqual(relatedPriceIds);

		// check if all the passed prices are related to the ticket
		priceIds.forEach((ticketId) => {
			const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
				entity: 'prices',
				entityId: ticketId,
				relation: 'tickets',
			});

			expect(relatedTicketIds).toContain(mockedTicket.id);
		});
	});
});
