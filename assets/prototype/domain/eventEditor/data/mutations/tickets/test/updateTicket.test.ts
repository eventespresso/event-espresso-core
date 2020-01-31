import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useEntityMutator, EntityType } from '../../../../../../application/services/apollo/mutations';
import { useRelations } from '../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedTickets } from './data';
import { nodes as datetimes } from '../../../queries/datetimes/test/data';
import { nodes as prices } from '../../../queries/prices/test/data';
import { MutationInput } from '../../../../../../application/services/apollo/mutations/types';
import useInitTicketTestCache from '../../../queries/tickets/test/useInitTicketTestCache';

const timeout = 5000; // milliseconds
describe('updateTicket', () => {
	let testInput: MutationInput = { name: 'New Test Ticket', description: 'New Test Desc' };
	const mockedTicket = mockedTickets.UPDATE;

	const datetimeIds = datetimes.map(({ id }) => id);
	const priceIds = prices.map(({ id }) => id);

	let mutationMocks = getMutationMocks({ ...testInput, id: mockedTicket.id }, MutationType.Update);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return useEntityMutator(EntityType.Ticket, mockedTicket.id);
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
		await waitForNextUpdate({ timeout });

		expect(mutationData).toEqual(mockResult.data);
		const pathToName = ['updateEspressoTicket', 'espressoTicket', 'name'];

		const nameFromMutationData = path<string>(pathToName, mutationData);
		const nameFromMockData = path<string>(pathToName, mockResult.data);

		expect(nameFromMutationData).toEqual(nameFromMockData);
	});

	it('checks for datetime relation addition/update after mutation', async () => {
		// Add related datetime Ids to the mutation input
		testInput = { ...testInput, datetimes: datetimeIds };

		mutationMocks = getMutationMocks({ ...testInput, id: mockedTicket.id }, MutationType.Update);

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
			mutationResult.current.mutator.updateEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate({ timeout });

		// check if ticket is related to all the passed datetimes
		const relatedDatetimeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'datetimes',
		});

		expect(datetimeIds.length).toEqual(relatedDatetimeIds.length);

		expect(datetimeIds).toEqual(relatedDatetimeIds);

		// check if all the passed datetimes are related to the ticket
		datetimeIds.forEach((ticketId) => {
			const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
				entity: 'datetimes',
				entityId: ticketId,
				relation: 'tickets',
			});

			expect(relatedTicketIds).toContain(mockedTicket.id);
		});
	});

	it('checks for datetime relation removal/update after mutation', async () => {
		// Add related datetimes Ids to the mutation input
		testInput = { ...testInput, datetimes: datetimeIds };

		mutationMocks = getMutationMocks({ ...testInput, id: mockedTicket.id }, MutationType.Update);

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

		const tempDatetimeId = 'temp-dtt-id';

		act(() => {
			// add relation between mockedTicket and a random datetime id
			mutationResult.current.relationsManager.addRelation({
				entity: 'tickets',
				entityId: mockedTicket.id,
				relation: 'datetimes',
				relationId: tempDatetimeId,
			});
		});

		// check if ticket is related to `tempDatetimeId`
		let relatedDatetimeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'datetimes',
		});
		expect(relatedDatetimeIds).toContain(tempDatetimeId);

		act(() => {
			// mutate
			mutationResult.current.mutator.updateEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate({ timeout });

		// check if ticket is related to `tempDatetimeId`
		relatedDatetimeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'datetimes',
		});

		// check if ticket has been removed from tempDatetimeId relation
		expect(relatedDatetimeIds).not.toContain(tempDatetimeId);
	});

	it('checks for price relation addition/update after mutation', async () => {
		// Add related price Ids to the mutation input
		testInput = { ...testInput, prices: priceIds };

		mutationMocks = getMutationMocks({ ...testInput, id: mockedTicket.id }, MutationType.Update);

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
			mutationResult.current.mutator.updateEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate({ timeout });

		// check if ticket is related to all the passed prices
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

	it('checks for price relation removal/update after mutation', async () => {
		// Add related prices Ids to the mutation input
		testInput = { ...testInput, prices: priceIds };

		mutationMocks = getMutationMocks({ ...testInput, id: mockedTicket.id }, MutationType.Update);

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

		const tempPriceId = 'temp-price-id';

		act(() => {
			// add relation between mockedTicket and a random price id
			mutationResult.current.relationsManager.addRelation({
				entity: 'tickets',
				entityId: mockedTicket.id,
				relation: 'prices',
				relationId: tempPriceId,
			});
		});

		// check if ticket is related to `tempPriceId`
		let relatedPriceIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'prices',
		});
		expect(relatedPriceIds).toContain(tempPriceId);

		act(() => {
			// mutate
			mutationResult.current.mutator.updateEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextMutationUpdate({ timeout });

		// check if ticket is related to `tempPriceId`
		relatedPriceIds = mutationResult.current.relationsManager.getRelations({
			entity: 'tickets',
			entityId: mockedTicket.id,
			relation: 'prices',
		});

		// check if ticket has been removed from tempPriceId relation
		expect(relatedPriceIds).not.toContain(tempPriceId);
	});
});
