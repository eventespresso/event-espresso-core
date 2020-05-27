import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useRelations } from '../../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedPrices } from './data';
import usePrices from '../../../queries/prices/usePrices';
import { nodes as priceTypes } from '../../../queries/priceTypes/test/data';
import { usePriceMutator, CreatePriceInput } from '../';
import { getGuids } from '@appServices/predicates';

const timeout = 5000; // milliseconds
describe('createPrice', () => {
	const mockedPrice = mockedPrices.CREATE;

	const priceTypeId = priceTypes[0].id;
	const testInput: CreatePriceInput = {
		name: 'New Test Price',
		description: 'New Test Desc',
		priceType: priceTypeId,
	};

	let mutationMocks = getMutationMocks(testInput, MutationType.Create);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForValueToChange } = renderHook(() => usePriceMutator(), {
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
		const pathToName = ['createEspressoPrice', 'espressoPrice', 'name'];

		const nameFromMutationData = path<string>(pathToName, mutationData);
		const nameFromMockData = path<string>(pathToName, mockResult.data);

		expect(nameFromMutationData).toEqual(nameFromMockData);
	});

	it('checks for the mutation data to be same as that in the cache - usePrices', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate } = renderHook(
			() => ({
				mutator: usePriceMutator(),
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

		const cachedPriceIds = getGuids(cacheResult.current);

		expect(cachedPriceIds).toContain(mockedPrice.id);
	});

	it('checks for ticket and priceType relation update after mutation', async () => {
		// Add related to the mutation input
		const newTestInput = { ...testInput, priceType: priceTypeId };

		mutationMocks = getMutationMocks(newTestInput, MutationType.Create);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate } = renderHook(
			() => ({
				mutator: usePriceMutator(),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.createEntity(newTestInput);
		});

		// wait for mutation promise to resolve
		await waitForNextUpdate({ timeout });

		// check if price is related to all the passed prices
		const relatedPriceTypeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'priceTypes',
		});

		expect(relatedPriceTypeIds).toContain(priceTypeId);
	});
});
