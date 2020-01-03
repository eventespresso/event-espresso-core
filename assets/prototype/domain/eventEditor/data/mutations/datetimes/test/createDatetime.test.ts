import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useEntityMutator, EntityType } from '../../../../../../application/services/apollo/mutations';
import { useRelations } from '../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context';
import { getMutationMocks, mockedDatetime } from './data';
import { nodes as tickets } from '../../../queries/tickets/test/data';
import { MutationInput } from '../../../../../../application/services/apollo/mutations/types';
import useDatetimeItem from '../../../queries/datetimes/useDatetimeItem';
import useDatetimeIds from '../../../queries/datetimes/useDatetimeIds';

describe('createDatetime', () => {
	let testInput: MutationInput = { name: 'New Test Date', description: 'New Test Desc' };

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

		const nameFromMutationData = path(pathToName, mutationData);
		const nameFromMockData = path(pathToName, mockResult.data);

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

		let cache: any;

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
			cache = mutationResult.current.client.extract();
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate();

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

		let cache: any;

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
			cache = mutationResult.current.client.extract();
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate();

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

		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'datetimes',
			entityId: mockedDatetime.id,
			relation: 'tickets',
		});

		expect(ticketIds.length).toEqual(relatedTicketIds.length);

		expect(ticketIds).toEqual(relatedTicketIds);
	});
});
