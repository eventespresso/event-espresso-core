import { useCallback } from 'react';

import useMutationVariables from './useMutationVariables';
import useOnCreateDatetime from './useOnCreateDatetime';
import useOnDeleteDatetime from './useOnDeleteDatetime';
import useOnUpdateDatetime from './useOnUpdateDatetime';
import useOptimisticResponse from './useOptimisticResponse';
import { DEFAULT_DATETIME_LIST_DATA as DEFAULT_LIST_DATA } from '@edtrServices/apollo/queries';
import { DatetimesList, Datetime } from '@edtrServices/apollo/types';
import { MutationType } from '@appServices/apollo/mutations';
import { MutationHandler, MutationUpdater } from '../types';
import { useDatetimeQueryOptions } from '@edtrServices/apollo/queries/datetimes';
import { DatetimeCommonInput } from './types';

type MH = MutationHandler<Datetime, DatetimeCommonInput>;

const useMutationHandler = (): MH => {
	const options = useDatetimeQueryOptions();

	const onCreateDatetime = useOnCreateDatetime();
	const onUpdateDatetime = useOnUpdateDatetime();
	const onDeleteDatetime = useOnDeleteDatetime();

	const getMutationVariables = useMutationVariables();
	const getOptimisticResponse = useOptimisticResponse();

	const onUpdate = useCallback<MutationUpdater<Datetime, DatetimeCommonInput>>(
		({ proxy, entity: datetime, input, mutationType }) => {
			// Read the existing data from cache.
			let data: DatetimesList;
			try {
				data = proxy.readQuery(options);
			} catch (error) {
				data = null;
			}
			const datetimes = data?.espressoDatetimes || DEFAULT_LIST_DATA;
			const tickets = input?.tickets;

			switch (mutationType) {
				case MutationType.Create:
					onCreateDatetime({ proxy, datetimes, datetime, tickets });
					break;
				case MutationType.Update:
					onUpdateDatetime({ datetime, tickets });
					break;
				case MutationType.Delete:
					onDeleteDatetime({ proxy, datetimes, datetime, deletePermanently: input?.deletePermanently });
					break;
			}
		},
		[onCreateDatetime, onDeleteDatetime, onUpdateDatetime, options]
	);

	const mutationHandler = useCallback<MH>(
		(mutationType, input) => {
			const variables = getMutationVariables(mutationType, input);
			const optimisticResponse = getOptimisticResponse(mutationType, input);

			return { variables, optimisticResponse, onUpdate };
		},
		[getMutationVariables, getOptimisticResponse, onUpdate]
	);

	return mutationHandler;
};

export default useMutationHandler;
