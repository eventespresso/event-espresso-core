import { useRelations, RelationsManager } from '../../../../../application/services/apollo/relations';
import updateTicketCache from './updateTicketCache';
import useUpdateDatetimeCache from './useUpdateDatetimeCache';
import { DatetimeMutationCallbackFn, DatetimeMutationCallbackFnArgs, CacheUpdaterFn } from '../types';
import { Datetime } from '../../types';

const useOnCreateDatetime = (): DatetimeMutationCallbackFn => {
	const { updateRelations, addRelation } = useRelations() as RelationsManager;

	const updateDatetimeCache: CacheUpdaterFn = useUpdateDatetimeCache();

	const onCreateDatetime = ({ proxy, datetimes, datetime, tickets }: DatetimeMutationCallbackFnArgs): void => {
		if (datetime.id) {
			const { nodes = [] } = datetimes;
			const datetimeIn: string[] = nodes.map(({ id }: Datetime) => id);
			const { id: datetimeId } = datetime;

			// Update tickets cache for the changed datetimes,
			// to avoid refetching of tickets.
			updateTicketCache({ proxy, datetimeIn, datetimeId });

			updateRelations({
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
				relationIds: tickets,
			});
			tickets.forEach((entityId: string) => {
				addRelation({
					entity: 'tickets',
					entityId,
					relation: 'datetimes',
					relationId: datetimeId,
				});
			});
		}
		// Update datetime cache after tickets cache is updated.
		updateDatetimeCache({ proxy, datetimes, datetime });
	};

	return onCreateDatetime;
};

export default useOnCreateDatetime;
