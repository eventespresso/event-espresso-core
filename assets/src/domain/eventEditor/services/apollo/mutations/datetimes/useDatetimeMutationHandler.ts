import { pathOr } from 'ramda';

import useDatetimeQueryOptions from '../../queries/datetimes/useDatetimeQueryOptions';
import useOnCreateDatetime from './useOnCreateDatetime';
import useOnUpdateDatetime from './useOnUpdateDatetime';
import useOnDeleteDatetime from './useOnDeleteDatetime';
import { MutationType } from '../../../../../../application/services/apollo/mutations';
import { DEFAULT_DATETIME_LIST_DATA as DEFAULT_LIST_DATA } from '../../queries';
import { Datetime, DatetimeEdge, DatetimesList } from '../../types';
import { EntityId } from '@appServices/apollo/types';
import useOptimisticResponse from './useOptimisticResponse';
import useMutationVariables from './useMutationVariables';
import { OnUpdateFnOptions, MutationHandler } from '../types';

const useDatetimeMutationHandler = (): MutationHandler => {
	const options = useDatetimeQueryOptions();

	const onCreateDatetime = useOnCreateDatetime();
	const onUpdateDatetime = useOnUpdateDatetime();
	const onDeleteDatetime = useOnDeleteDatetime();

	const getMutationVariables = useMutationVariables();
	const getOptimisticResponse = useOptimisticResponse();

	const mutationHandler: MutationHandler = <MI>(mutationType: MutationType, input: MI) => {
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
			const tickets = pathOr<Array<EntityId>>([], ['tickets'], input);

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

	return mutationHandler;
};

export default useDatetimeMutationHandler;
