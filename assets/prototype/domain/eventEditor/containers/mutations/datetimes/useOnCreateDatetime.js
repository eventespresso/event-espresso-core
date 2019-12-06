import useRelations from '../../../../../infrastructure/services/relations/useRelations';

import updateTicketCache from './updateTicketCache';
import useUpdateDatetmeCache from './useUpdateDatetmeCache';

const useOnCreateDatetime = () => {
	const { updateRelations, addRelation } = useRelations();

	const updateDatetmeCache = useUpdateDatetmeCache();

	const onCreateDatetime = ({ proxy, datetimes, datetime, tickets }) => {
		if (datetime.id) {
			const datetimeIn = datetimes.nodes.map(({ id }) => id);
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
		updateDatetmeCache({ proxy, datetimes, datetime });
	};

	return onCreateDatetime;
};

export default useOnCreateDatetime;
