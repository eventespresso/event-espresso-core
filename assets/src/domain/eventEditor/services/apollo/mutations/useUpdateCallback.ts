import { useCallback } from 'react';
import { pathOr } from 'ramda';
import { TypeName } from './types';

const useUpdateCallback = (typeName: TypeName) => {
	return useCallback(
		({ onUpdate, mutationType, input }) => {
			/**
			 * Since every mutation update callback is interested
			 * in the updated entity data in response, we will
			 * pass just that entity to onUpdate.
			 */
			return (proxy, result) => {
				// e.g. "createDatetime", "updateTicket"
				const mutationName = `${mutationType.toLowerCase()}Espresso${typeName}`;
				// Example result: { data: { deletePrice: { price : {...} } } }
				const path = ['data', mutationName, `espresso${typeName}`];
				const entity = pathOr<any>({}, path, result);

				onUpdate({ proxy, entity, mutationType, input });
			};
		},
		[typeName]
	);
};

export default useUpdateCallback;
