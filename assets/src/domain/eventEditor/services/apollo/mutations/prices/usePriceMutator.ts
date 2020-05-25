import { CreatePriceInput, DeletePriceInput, UpdatePriceInput } from './types';
import { MutatorFnGn } from '@appServices/apollo/mutations';
import { useMutator, TypeName } from '../';

interface PriceMutator {
	createEntity: MutatorFnGn<CreatePriceInput>;
	updateEntity: MutatorFnGn<UpdatePriceInput>;
	deleteEntity: MutatorFnGn<DeletePriceInput>;
}

const usePriceMutator = (id = ''): PriceMutator => {
	return useMutator(TypeName.Price, id) as PriceMutator;
};

export default usePriceMutator;
