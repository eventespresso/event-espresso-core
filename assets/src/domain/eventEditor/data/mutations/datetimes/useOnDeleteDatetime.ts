import { useRelations, RelationsManager } from '../../../../../application/services/apollo/relations';
import { DatetimeMutationCallbackFn, DatetimeMutationCallbackFnArgs, CacheUpdaterFn } from '../types';
import updateTicketCache from './updateTicketCache';
import useUpdateDatetimeCache from './useUpdateDatetimeCache';

const useOnDeleteDatetime = (): DatetimeMutationCallbackFn => {
	const { dropRelations, removeRelation } = useRelations() as RelationsManager;

	const updateDatetimeCache: CacheUpdaterFn = useUpdateDatetimeCache();

	const onDeleteDatetime = ({ proxy, datetimes, datetime }: DatetimeMutationCallbackFnArgs): void => {
		if (datetime.id) {
			const { nodes = [] } = datetimes;
			const datetimeIn = nodes.map(({ id }) => id);
			const { id: datetimeId } = datetime;

			// Update tickets cache for the changed datetimes,
			// to avoid refetching of tickets.
			updateTicketCache({ proxy, datetimeIn, datetimeId, remove: true });

			// Remove the datetime from all ticket relations
			removeRelation({
				entity: 'datetimes',
				entityId: datetime.id,
				relation: 'tickets',
			});
			// Drop all the relations for the datetime
			dropRelations({
				entity: 'datetimes',
				entityId: datetime.id,
			});
		}
		// Update datetime cache after tickets cache is updated.
		updateDatetimeCache({ proxy, datetimes, datetime, remove: true });
	};

	return onDeleteDatetime;
};

export default useOnDeleteDatetime;
