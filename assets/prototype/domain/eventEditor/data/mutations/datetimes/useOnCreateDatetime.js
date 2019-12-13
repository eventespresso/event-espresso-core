import useRelations from '../../../../../application/services/apollo/relations/useRelations';

import updateTicketCache from './updateTicketCache';
import useUpdateDatetimeCache from './useUpdateDatetimeCache';

const useOnCreateDatetime = () => {
	const { updateRelations, addRelation } = useRelations();

	const updateDatetimeCache = useUpdateDatetimeCache();

	const onCreateDatetime = ({ proxy, datetimes, datetime, tickets }) => {
		if (datetime.id) {
			const { nodes = [] } = datetimes;
			const datetimeIn = nodes.map(({ id }) => id);
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
			tickets.forEach((entityId) => {
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
