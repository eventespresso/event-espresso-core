import { useCallback, useMemo } from 'react';

import { CreatePriceInput, UpdatePriceInput, DeletePriceInput } from './types';
import { MutationType, useMutationWithFeedback } from '@appServices/apollo/mutations';
import { CREATE_PRICE, UPDATE_PRICE, DELETE_PRICE } from './';
import useMutationHandler from './useMutationHandler';
import useUpdateCallback from '../useUpdateCallback';
import { MutationFunction, TypeName } from '../types';
import { CreatePriceResult, UpdatePriceResult, DeletePriceResult } from './types';
import { useSystemNotifications } from '@application/services';

interface PriceMutator {
	createEntity: MutationFunction<CreatePriceResult, CreatePriceInput>;
	updateEntity: MutationFunction<UpdatePriceResult, UpdatePriceInput>;
	deleteEntity: MutationFunction<DeletePriceResult, DeletePriceInput>;
}

type PM = PriceMutator;

const usePriceMutator = (id = ''): PM => {
	// create a single toaster instance to share between all mutations
	const toaster = useSystemNotifications();

	const createPrice = useMutationWithFeedback({
		typeName: TypeName.Price,
		mutationType: MutationType.Create,
		mutation: CREATE_PRICE,
		toaster,
	});

	const updatePrice = useMutationWithFeedback({
		typeName: TypeName.Price,
		mutationType: MutationType.Update,
		mutation: UPDATE_PRICE,
		toaster,
	});

	const deletePrice = useMutationWithFeedback({
		typeName: TypeName.Price,
		mutationType: MutationType.Delete,
		mutation: DELETE_PRICE,
		toaster,
	});

	const mutationHandler = useMutationHandler();

	const getUpdateCallback = useUpdateCallback(TypeName.Price);

	const createEntity = useCallback<PM['createEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Create, input);

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Create, input });

			return createPrice({ ...options, update });
		},
		[createPrice, getUpdateCallback, mutationHandler]
	);

	const updateEntity = useCallback<PM['updateEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Update, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Update, input });

			return updatePrice({ ...options, update });
		},
		[getUpdateCallback, id, mutationHandler, updatePrice]
	);

	const deleteEntity = useCallback<PM['deleteEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Delete, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Delete, input });

			return deletePrice({ ...options, update });
		},
		[deletePrice, getUpdateCallback, id, mutationHandler]
	);
	return useMemo(() => ({ createEntity, updateEntity, deleteEntity }), [createEntity, deleteEntity, updateEntity]);
};

export default usePriceMutator;
