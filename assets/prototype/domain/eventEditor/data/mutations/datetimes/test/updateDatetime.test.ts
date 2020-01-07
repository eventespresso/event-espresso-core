import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useEntityMutator, EntityType } from '../../../../../../application/services/apollo/mutations';
import { useRelations } from '../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context';
import { getMutationMocks, mockedDatetimes } from './data';
import { nodes as tickets } from '../../../queries/tickets/test/data';
import { MutationInput } from '../../../../../../application/services/apollo/mutations/types';
import useInitDatetimeTestCache from '../../../queries/datetimes/test/useInitDatetimeTestCache';

describe('updateDatetime', () => {
	let testInput: MutationInput = { name: 'New Test Date', description: 'New Test Desc' };
	const mockedDatetime = mockedDatetimes.UPDATE;

	const ticketIds = tickets.map(({ id }) => id);

	let mutationMocks = getMutationMocks({ ...testInput, id: mockedDatetime.id }, MutationType.Update);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useEntityMutator(EntityType.Datetime, mockedDatetime.id);
			},
			{
				wrapper,
			}
		);

		let mutationData: any;

		act(() => {
			result.current.updateEntity(testInput, {
				onCompleted: (data: any) => {
					mutationData = data;
				},
			});
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate();

		expect(mutationData).toEqual(mockResult.data);
		const pathToName = ['updateEspressoDatetime', 'espressoDatetime', 'name'];

		const nameFromMutationData = path(pathToName, mutationData);
		const nameFromMockData = path(pathToName, mockResult.data);

		expect(nameFromMutationData).toEqual(nameFromMockData);
	});

	it('checks for relation update after mutation', async () => {
		// Add related ticket Ids to the mutation input
		testInput = { ...testInput, tickets: ticketIds };

		mutationMocks = getMutationMocks({ ...testInput, id: mockedDatetime.id }, MutationType.Update);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate: waitForNextMutationUpdate } = renderHook(
			() => ({
				mutator: useEntityMutator(EntityType.Datetime, mockedDatetime.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.updateEntity(testInput);
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
});
