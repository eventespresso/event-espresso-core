import { MutatorFnGn } from '@appServices/apollo/mutations';
import { useMutator, TypeName } from '../';
import { Price } from '../../types';
import { CreatePriceInput, UpdatePriceInput, DeletePriceInput } from './types';

interface PriceMutator {
	createEntity: MutatorFnGn<CreatePriceInput>;
	updateEntity: MutatorFnGn<UpdatePriceInput>;
	deleteEntity: MutatorFnGn<DeletePriceInput>;
}

const usePriceMutator = (id = ''): PriceMutator => {
	return useMutator<Price>(TypeName.Price, id) as PriceMutator;
};

export default usePriceMutator;
