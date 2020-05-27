import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useRelations } from '../../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedPrices } from './data';
import { nodes as priceTypes } from '../../../queries/priceTypes/test/data';
import { MutationInput } from '../../../../../../../application/services/apollo/mutations/types';
import useInitPriceTestCache from '../../../queries/prices/test/useInitPriceTestCache';
import { usePriceMutator } from '../';

const timeout = 5000; // milliseconds
describe('updatePrice', () => {
	let testInput: MutationInput = { name: 'New Test Price', description: 'New Test Desc' };
	const mockedPrice = mockedPrices.UPDATE;

	const priceTypeId = priceTypes[0].id;

	let mutationMocks = getMutationMocks({ ...testInput, id: mockedPrice.id }, MutationType.Update);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitPriceTestCache();
				return usePriceMutator(mockedPrice.id);
			},
			{
				wrapper,
			}
		);

		let mutationData: any;

		act(() => {
			result.current.updateEntity(testInput).then(({ data }) => {
				mutationData = data;
			});
		});

		// wait for mutation promise to resolve
		await waitForValueToChange(() => mutationData, { timeout });

		expect(mutationData).toEqual(mockResult.data);
		const pathToName = ['updateEspressoPrice', 'espressoPrice', 'name'];

		const nameFromMutationData = path<string>(pathToName, mutationData);
		const nameFromMockData = path<string>(pathToName, mockResult.data);

		expect(nameFromMutationData).toEqual(nameFromMockData);
	});

	it('checks for priceType relation addition/update after mutation', async () => {
		// Add related priceType Ids to the mutation input
		testInput = { ...testInput, priceType: priceTypeId };

		mutationMocks = getMutationMocks({ ...testInput, id: mockedPrice.id }, MutationType.Update);

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
			mutationResult.current.mutator.updateEntity(testInput);
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
