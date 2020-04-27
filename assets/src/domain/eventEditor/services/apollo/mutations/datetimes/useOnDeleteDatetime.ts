import updateTicketCache from './updateTicketCache';
import useUpdateDatetimeCache from './useUpdateDatetimeCache';
import { DatetimeMutationCallbackFn, DatetimeMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';
import { getGuids } from '@appServices/predicates';

const useOnDeleteDatetime = (): DatetimeMutationCallbackFn => {
	const { dropRelations, removeRelation } = useRelations();

	const updateDatetimeCache = useUpdateDatetimeCache();

	const onDeleteDatetime = ({
		proxy,
		datetimes,
		datetime,
		deletePermanently,
	}: DatetimeMutationCallbackFnArgs): void => {
		const action = deletePermanently ? 'remove' : 'update';
		if (datetime.id && deletePermanently) {
			const { nodes = [] } = datetimes;
			const datetimeIn = getGuids(nodes);
			const { id: datetimeId } = datetime;

			// Update tickets cache for the changed datetimes,
			// to avoid refetching of tickets.
			updateTicketCache({ proxy, datetimeIn, datetimeId, action });

			// Remove the datetime from all ticket relations
			removeRelation({
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
			});
			// Drop all the relations for the datetime
			dropRelations({
				entity: 'datetimes',
				entityId: datetimeId,
			});
		}
		// Update datetime cache after tickets cache is updated.
		updateDatetimeCache({ proxy, datetimes, datetime: { ...datetime, isTrashed: true }, action });
	};

	return onDeleteDatetime;
};

export default useOnDeleteDatetime;
