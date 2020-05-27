import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useRelations } from '../../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedDatetimes } from './data';
import { nodes as tickets } from '../../../queries/tickets/test/data';
import { useDatetimeMutator } from '../';
import { getGuids } from '@appServices/predicates';

const timeout = 5000; // milliseconds

describe('deleteDatetime', () => {
	const mockedDatetime = mockedDatetimes.DELETE;

	const ticketIds = getGuids(tickets);

	let mutationMocks = getMutationMocks({}, MutationType.Delete);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForValueToChange } = renderHook(() => useDatetimeMutator(mockedDatetime.id), {
			wrapper,
		});

		let mutationData: any;

		act(() => {
			result.current.deleteEntity().then(({ data }) => {
				mutationData = data;
			});
		});

		// wait for mutation promise to resolve
		await waitForValueToChange(() => mutationData, { timeout });

		expect(mutationData).toEqual(mockResult.data);
		const pathToId = ['deleteEspressoDatetime', 'espressoDatetime', 'name'];

		const idFromMutationData = path<string>(pathToId, mutationData);
		const idFromMockData = path<string>(pathToId, mockResult.data);

		expect(idFromMutationData).toEqual(idFromMockData);
	});

	it('checks for relation update after mutation - trash', async () => {
		// Add related ticket Ids to the mutation input

		mutationMocks = getMutationMocks({}, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate } = renderHook(
			() => ({
				mutator: useDatetimeMutator(mockedDatetime.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.deleteEntity({});
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'datetimes',
			entityId: mockedDatetime.id,
			relation: 'tickets',
		});

		expect(relatedTicketIds.length).toBe(2);
	});

	it('checks for relation update after mutation - permanent delete', async () => {
		const testInput = { deletePermanently: true };
		// Add related ticket Ids to the mutation input
		mutationMocks = getMutationMocks(testInput, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate } = renderHook(
			() => ({
				mutator: useDatetimeMutator(mockedDatetime.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.deleteEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'datetimes',
			entityId: mockedDatetime.id,
			relation: 'tickets',
		});

		expect(relatedTicketIds.length).toBe(0);

		// check if all the passed tickets are related to the datetime
		ticketIds.forEach((ticketId) => {
			const relatedDatetimeIds = mutationResult.current.relationsManager.getRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
			});

			expect(relatedDatetimeIds).not.toContain(mockedDatetime.id);
		});
	});
});
