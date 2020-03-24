import updateTicketCache from './updateTicketCache';
import useUpdateDatetimeCache from './useUpdateDatetimeCache';
import { Datetime } from '@edtrServices/apollo/types';
import { DatetimeMutationCallbackFn, DatetimeMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';

const useOnCreateDatetime = (): DatetimeMutationCallbackFn => {
	const { updateRelations, addRelation } = useRelations();

	const updateDatetimeCache = useUpdateDatetimeCache();

	const onCreateDatetime = ({ proxy, datetimes, datetime, tickets }: DatetimeMutationCallbackFnArgs): void => {
		if (datetime.id) {
			const { nodes = [] } = datetimes;
			const datetimeIn = nodes.map(({ id }: Datetime) => id);
			const { id: datetimeId } = datetime;

			// Update tickets cache for the changed datetimes,
			// to avoid refetching of tickets.
			updateTicketCache({ proxy, datetimeIn, datetimeId, action: 'add' });

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
		updateDatetimeCache({ proxy, datetimes, datetime, action: 'add' });
	};

	return onCreateDatetime;
};

export default useOnCreateDatetime;
