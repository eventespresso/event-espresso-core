import { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CreateDatetimeInput, UpdateDatetimeInput, DeleteDatetimeInput } from './types';
import { MutationType } from '@appServices/apollo/mutations';
import { CREATE_DATETIME, UPDATE_DATETIME, DELETE_DATETIME } from './';
import useMutationHandler from './useMutationHandler';
import useUpdateCallback from '../useUpdateCallback';
import { MutationFunction, TypeName } from '../types';

interface DatetimeMutator {
	createEntity: MutationFunction<any, CreateDatetimeInput>;
	updateEntity: MutationFunction<any, UpdateDatetimeInput>;
	deleteEntity: MutationFunction<any, DeleteDatetimeInput>;
}

const useDatetimeMutator = (id = ''): DatetimeMutator => {
	const [createDatetime] = useMutation(CREATE_DATETIME);
	const [updateDatetime] = useMutation(UPDATE_DATETIME);
	const [deleteDatetime] = useMutation(DELETE_DATETIME);

	const mutationHandler = useMutationHandler();

	const getUpdateCallback = useUpdateCallback(TypeName.Datetime);

	const createEntity = useCallback(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Create, input);

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Create, input });

			return createDatetime({ ...options, update });
		},
		[createDatetime, getUpdateCallback, mutationHandler]
	);

	const updateEntity = useCallback(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Update, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Update, input });

			return updateDatetime({ ...options, update });
		},
		[getUpdateCallback, id, mutationHandler, updateDatetime]
	);

	const deleteEntity = useCallback(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Delete, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Delete, input });

			return deleteDatetime({ ...options, update });
		},
		[deleteDatetime, getUpdateCallback, id, mutationHandler]
	);
	return useMemo(() => ({ createEntity, updateEntity, deleteEntity }), [createEntity, deleteEntity, updateEntity]);
};

export default useDatetimeMutator;
