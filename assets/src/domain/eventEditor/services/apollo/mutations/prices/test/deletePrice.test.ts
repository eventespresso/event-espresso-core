import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useRelations } from '../../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedPrices } from './data';
import { nodes as tickets } from '../../../queries/tickets/test/data';
import { usePriceMutator } from '../';
import { getGuids } from '@appServices/predicates';

const timeout = 5000; // milliseconds
describe('deletePrice', () => {
	const mockedPrice = mockedPrices.DELETE;

	const ticketIds = getGuids(tickets);

	let mutationMocks = getMutationMocks({}, MutationType.Delete);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForValueToChange } = renderHook(() => usePriceMutator(mockedPrice.id), {
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
		const pathToId = ['deleteEspressoPrice', 'espressoPrice', 'name'];

		const idFromMutationData = path(pathToId, mutationData);
		const idFromMockData = path(pathToId, mockResult.data);

		expect(idFromMutationData).toEqual(idFromMockData);
	});

	it('checks for ticket relation update after mutation - trash', async () => {
		// Add related ticket Ids to the mutation input
		mutationMocks = getMutationMocks({}, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: usePriceMutator(mockedPrice.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.deleteEntity({});
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'tickets',
		});

		expect(relatedTicketIds.length).toBe(1);
	});

	it('checks for ticket relation update after mutation - permanent delete', async () => {
		const testInput = { deletePermanently: true };

		// Add related ticket Ids to the mutation input
		mutationMocks = getMutationMocks(testInput, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: usePriceMutator(mockedPrice.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.deleteEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'tickets',
		});

		expect(relatedTicketIds.length).toBe(0);

		// check if all the passed tickets are related to the price
		ticketIds.forEach((ticketId) => {
			const relatedPriceIds = mutationResult.current.relationsManager.getRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
			});

			expect(relatedPriceIds).not.toContain(mockedPrice.id);
		});
	});

	it('checks for priceType relation update after mutation - trash', async () => {
		mutationMocks = getMutationMocks({}, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: usePriceMutator(mockedPrice.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.deleteEntity({});
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		const relatedPriceTypeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'priceTypes',
		});

		expect(relatedPriceTypeIds.length).toBe(1);
	});

	it('checks for priceType relation update after mutation - permanent delete', async () => {
		const testInput = { deletePermanently: true };

		mutationMocks = getMutationMocks(testInput, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: usePriceMutator(mockedPrice.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.deleteEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		const relatedPriceTypeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'priceTypes',
		});

		expect(relatedPriceTypeIds.length).toBe(0);
	});
});
