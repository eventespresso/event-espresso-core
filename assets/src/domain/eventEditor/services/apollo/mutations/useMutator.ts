import { useEntityMutator as useAppMutator, MutatorObject } from '@appServices/apollo/mutations';
import { TypeName } from './types';
import useMutationOptions from './useMutationOptions';

/**
 * @param {string} typeName Entity type name
 * @param {string} id       Entity id
 */
const useMutator = (typeName: TypeName, id = ''): MutatorObject => {
	const mutationOptionsCallback = useMutationOptions(typeName);

	return useAppMutator(mutationOptionsCallback, typeName, id);
};

export default useMutator;
