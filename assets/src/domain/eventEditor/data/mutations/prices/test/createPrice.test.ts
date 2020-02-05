import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useEntityMutator, EntityType } from '../../../../../../application/services/apollo/mutations';
import { useRelations } from '../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedPrices } from './data';
import usePrices from '../../../queries/prices/usePrices';
import { nodes as tickets } from '../../../queries/tickets/test/data';
import { nodes as priceTypes } from '../../../queries/priceTypes/test/data';
import { MutationInput } from '../../../../../../application/services/apollo/mutations/types';

const timeout = 5000; // milliseconds
describe('createPrice', () => {
	const testInput: MutationInput = { name: 'New Test Price', desc: 'New Test Desc' };
	const mockedPrice = mockedPrices.CREATE;

	const ticketId = tickets[0].id;
	const priceTypeId = priceTypes[0].id;

	let mutationMocks = getMutationMocks(testInput, MutationType.Create);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForValueToChange } = renderHook(() => useEntityMutator(EntityType.Price), {
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
		await waitForValueToChange(() => mutationData, { timeout });

		expect(mutationData).toEqual(mockResult.data);
		const pathToName = ['createEspressoPrice', 'espressoPrice', 'name'];

		const nameFromMutationData = path<string>(pathToName, mutationData);
		const nameFromMockData = path<string>(pathToName, mockResult.data);

		expect(nameFromMutationData).toEqual(nameFromMockData);
	});

	it('checks for the mutation data to be same as that in the cache - usePrices', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: useEntityMutator(EntityType.Price),
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
				return usePrices();
			},
			{
				wrapper,
			}
		);

		// wait for mutation promise to resolve
		await waitForUpdate({ timeout });

		const cachedPriceIds = cacheResult.current.map(({ id }) => id);

		expect(cachedPriceIds).toContain(mockedPrice.id);
	});

	it('checks for ticket and priceType relation update after mutation', async () => {
		// Add related ticketId and priceTypeId to the mutation input
		const newTestInput = { ...testInput, ticketId, priceType: priceTypeId };

		mutationMocks = getMutationMocks(newTestInput, MutationType.Create);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => ({
				mutator: useEntityMutator(EntityType.Price),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.createEntity(newTestInput);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		// check if price is related to all the passed prices
		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'tickets',
		});

		expect(relatedTicketIds).toContain(ticketId);

		// check if price is related to all the passed prices
		const relatedPriceTypeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'priceTypes',
		});

		expect(relatedPriceTypeIds).toContain(priceTypeId);
	});
});
