import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useEntityMutator, EntityType } from '../../../../../../application/services/apollo/mutations';
import { useRelations } from '../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedDatetimes } from './data';
import { nodes as tickets } from '../../../queries/tickets/test/data';
import { MutationInput } from '../../../../../../application/services/apollo/mutations/types';
import useDatetimeItem from '../../../queries/datetimes/useDatetimeItem';
import useDatetimeIds from '../../../queries/datetimes/useDatetimeIds';
import useInitTicketTestCache from '../../../queries/tickets/test/useInitTicketTestCache';
import useTickets from '../../../queries/tickets/useTickets';
import useTicketQueryOptions from '../../../queries/tickets/useTicketQueryOptions';

describe('createDatetime', () => {
	let testInput: MutationInput = { name: 'New Test Date', description: 'New Test Desc' };
	const mockedDatetime = mockedDatetimes.CREATE;

	const ticketIds = tickets.map(({ id }) => id);

	let mutationMocks = getMutationMocks(testInput, MutationType.Create);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForNextUpdate } = renderHook(() => useEntityMutator(EntityType.Datetime), {
			wrapper,
		});

		let mutationData: any;

		act(() => {
			result.current.createEntity(testInput, {
				onCompleted: (data: any) => {
					mutationData = data;
				},
			});
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate();

		expect(mutationData).toEqual(mockResult.data);
		const pathToName = ['createEspressoDatetime', 'espressoDatetime', 'name'];

		const nameFromMutationData = path<string>(pathToName, mutationData);
		const nameFromMockData = path<string>(pathToName, mockResult.data);

		expect(nameFromMutationData).toEqual(nameFromMockData);
	});

	it('checks for the mutation data to be same as that in the cache - useDatetimeItem', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate: waitForNextMutationUpdate } = renderHook(
			() => ({
				mutator: useEntityMutator(EntityType.Datetime),
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
		await waitForNextMutationUpdate();

		const cache = mutationResult.current.client.extract();
		const { result: cacheResult } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return useDatetimeItem({ id: mockedDatetime.id });
			},
			{
				wrapper,
			}
		);

		const cachedDatetime = cacheResult.current;

		expect(cachedDatetime).toEqual({ ...mockedDatetime, ...testInput });
	});

	it('checks for the mutation data to be same as that in the cache - useDatetimeIds', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate: waitForNextMutationUpdate } = renderHook(
			() => ({
				mutator: useEntityMutator(EntityType.Datetime),
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
		await waitForNextMutationUpdate();

		const cache = mutationResult.current.client.extract();
		const { result: cacheResult } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return useDatetimeIds();
			},
			{
				wrapper,
			}
		);

		const cachedDatetimes = cacheResult.current;

		expect(cachedDatetimes).toContain(mockedDatetime.id);
	});

	it('checks for relation update after mutation', async () => {
		// Add related ticket Ids to the mutation input
		testInput = { ...testInput, tickets: ticketIds };

		mutationMocks = getMutationMocks(testInput, MutationType.Create);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate: waitForNextMutationUpdate } = renderHook(
			() => ({
				mutator: useEntityMutator(EntityType.Datetime),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate();

		// check if datetime is related to all the passed tickets
		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'datetimes',
			entityId: mockedDatetime.id,
			relation: 'tickets',
		});

		expect(ticketIds.length).toEqual(relatedTicketIds.length);

		expect(ticketIds).toEqual(relatedTicketIds);

		// check if all the passed tickets are related to the datetime
		ticketIds.forEach((ticketId) => {
			const relatedDatetimeIds = mutationResult.current.relationsManager.getRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
			});

			expect(relatedDatetimeIds).toContain(mockedDatetime.id);
		});
	});

	it('checks if the mutation updates tickets cache', async () => {
		// Add related ticket Ids to the mutation input
		testInput = { ...testInput, tickets: ticketIds };

		mutationMocks = getMutationMocks(testInput, MutationType.Create);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate: waitForNextMutationUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return {
					mutator: useEntityMutator(EntityType.Datetime),
					client: useApolloClient(),
				};
			},
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate();

		const cache = mutationResult.current.client.extract();
		const { result: cacheResult } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return {
					queryOptions: useTicketQueryOptions(),
					tickets: useTickets(),
				};
			},
			{
				wrapper,
			}
		);

		const queryOptions = cacheResult.current.queryOptions;
		const cachedTickets = cacheResult.current.tickets;

		// check if query options are updated,
		// which means the cache is updated
		expect(queryOptions.variables.where.datetimeIn).toContain(mockedDatetime.id);
		expect(cachedTickets).toBeDefined();
	});
});
