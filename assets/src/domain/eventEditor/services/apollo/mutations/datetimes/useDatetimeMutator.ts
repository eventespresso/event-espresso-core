import { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CreateDatetimeInput, UpdateDatetimeInput, DeleteDatetimeInput } from './types';
import { MutationType } from '@appServices/apollo/mutations';
import { CREATE_DATETIME, UPDATE_DATETIME, DELETE_DATETIME } from './';
import useMutationHandler from './useMutationHandler';
import useUpdateCallback from '../useUpdateCallback';
import { MutationFunction, TypeName } from '../types';
import { CreateDatetimeResult, UpdateDatetimeResult, DeleteDatetimeResult } from './types';

interface DatetimeMutator {
	createEntity: MutationFunction<CreateDatetimeResult, CreateDatetimeInput>;
	updateEntity: MutationFunction<UpdateDatetimeResult, UpdateDatetimeInput>;
	deleteEntity: MutationFunction<DeleteDatetimeResult, DeleteDatetimeInput>;
}

type DM = DatetimeMutator;

const useDatetimeMutator = (id = ''): DM => {
	const [createDatetime] = useMutation(CREATE_DATETIME);
	const [updateDatetime] = useMutation(UPDATE_DATETIME);
	const [deleteDatetime] = useMutation(DELETE_DATETIME);

	const mutationHandler = useMutationHandler();

	const getUpdateCallback = useUpdateCallback(TypeName.Datetime);

	const createEntity = useCallback<DM['createEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Create, input);

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Create, input });

			return createDatetime({ ...options, update });
		},
		[createDatetime, getUpdateCallback, mutationHandler]
	);

	const updateEntity = useCallback<DM['updateEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Update, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Update, input });

			return updateDatetime({ ...options, update });
		},
		[getUpdateCallback, id, mutationHandler, updateDatetime]
	);

	const deleteEntity = useCallback<DM['deleteEntity']>(
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
