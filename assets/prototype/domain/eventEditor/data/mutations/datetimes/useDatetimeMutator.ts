import { pathOr } from 'ramda';

import useDatetimeQueryOptions from '../../queries/datetimes/useDatetimeQueryOptions';
import useOnCreateDatetime from './useOnCreateDatetime';
import useOnUpdateDatetime from './useOnUpdateDatetime';
import useOnDeleteDatetime from './useOnDeleteDatetime';
import { Mutator, MutationType, OnUpdateFnOptions } from '../../../../../application/services/apollo/mutations/types';
import { DEFAULT_DATETIME_LIST_DATA as DEFAULT_LIST_DATA } from '../../queries';
import { Datetime, DatetimeEdge, DatetimesList } from '../../types';
import useOptimisticResponse from './useOptimisticResponse';
import useMutationVariables from './useMutationVariables';

const useDatetimeMutator = (): Mutator => {
	const options = useDatetimeQueryOptions();

	const onCreateDatetime = useOnCreateDatetime();
	const onUpdateDatetime = useOnUpdateDatetime();
	const onDeleteDatetime = useOnDeleteDatetime();
	
	const getMutationVariables = useMutationVariables();
	const getOptimisticResponse = useOptimisticResponse();

	const mutator: Mutator = (mutationType, input) => {
		const variables = getMutationVariables(mutationType, input);
		const optimisticResponse = getOptimisticResponse(mutationType, input);

		const onUpdate = ({ proxy, entity: datetime }: OnUpdateFnOptions<Datetime>): void => {
			// Read the existing data from cache.
			let data: DatetimesList;
			try {
				data = proxy.readQuery<DatetimesList>(options);
			} catch (error) {
				data = null;
			}
			const datetimes = pathOr<DatetimeEdge>(DEFAULT_LIST_DATA, ['espressoDatetimes'], data);
			const { tickets = [] } = input;

			switch (mutationType) {
				case MutationType.Create:
					onCreateDatetime({ proxy, datetimes, datetime, tickets });
					break;
				case MutationType.Update:
					onUpdateDatetime({ datetime, tickets });
					break;
				case MutationType.Delete:
					onDeleteDatetime({ proxy, datetimes, datetime });
					break;
			}
		};

		return { variables, optimisticResponse, onUpdate };
	};

	return mutator;
};

export default useDatetimeMutator;
