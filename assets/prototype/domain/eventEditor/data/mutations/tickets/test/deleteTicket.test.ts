import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useEntityMutator, EntityType } from '../../../../../../application/services/apollo/mutations';
import { useRelations } from '../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context';
import { getMutationMocks, mockedTickets } from './data';
import { nodes as datetimes } from '../../../queries/datetimes/test/data';
import { nodes as prices } from '../../../queries/prices/test/data';

describe('deleteTicket', () => {
	const mockedTicket = mockedTickets.DELETE;

	const datetimeIds = datetimes.map(({ id }) => id);
	const priceIds = prices.map(({ id }) => id);

	let mutationMocks = getMutationMocks({}, MutationType.Delete);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForNextUpdate } = renderHook(() => useEntityMutator(EntityType.Ticket, mockedTicket.id), {
			wrapper,
		});

		let mutationData: any;

		act(() => {
			result.current.deleteEntity(
				{},
				{
					onCompleted: (data: any) => {
						mutationData = data;
					},
				}
			);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate();

		expect(mutationData).toEqual(mockResult.data);
		const pathToId = ['deleteEspressoTicket', 'espressoTicket', 'name'];

		const idFromMutationData = path(pathToId, mutationData);
		const idFromMockData = path(pathToId, mockResult.data);

		expect(idFromMutationData).toEqual(idFromMockData);
	});

	it('checks for datetime relation update after mutation', async () => {
		// Add related datetime Ids to the mutation input

		mutationMocks = getMutationMocks({}, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate: waitForNextMutationUpdate } = renderHook(
			() => ({
				mutator: useEntityMutator(EntityType.Ticket, mockedTicket.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.deleteEntity();
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate();

		const relatedDatetimeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'datetimes',
		});

		expect(relatedDatetimeIds.length).toBe(0);

		// check if all the passed datetimes are related to the ticket
		datetimeIds.forEach((datetimeId) => {
			const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
			});

			expect(relatedTicketIds).not.toContain(mockedTicket.id);
		});
	});

	it('checks for price relation update after mutation', async () => {
		mutationMocks = getMutationMocks({}, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate: waitForNextMutationUpdate } = renderHook(
			() => ({
				mutator: useEntityMutator(EntityType.Ticket, mockedTicket.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.deleteEntity();
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate();

		const relatedPriceIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'prices',
		});

		expect(relatedPriceIds.length).toBe(0);

		// check if all the passed prices are related to the ticket
		priceIds.forEach((priceId) => {
			const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
				entity: 'prices',
				entityId: priceId,
				relation: 'tickets',
			});

			expect(relatedTicketIds).not.toContain(mockedTicket.id);
		});
	});
});
