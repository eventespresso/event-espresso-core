import useRelations from '../../../../../infrastructure/services/relations/useRelations';

const useOnUpdateTicket = () => {
	const { updateRelations, addRelation, removeRelation } = useRelations();

	const onUpdateTicket = ({ ticket, datetimeIds, priceIds }) => {
		if (ticket.id && datetimeIds.length) {
			const { id: ticketId } = ticket;

			// make sure to remove ticket from
			// all existing relations
			removeRelation({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
			});

			updateRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
				relationIds: datetimeIds,
			});

			datetimeIds.forEach((entityId) => {
				addRelation({
					entity: 'datetimes',
					entityId,
					relation: 'tickets',
					relationId: ticketId,
				});
			});
		}

		if (ticket.id && priceIds.length) {
			const { id: ticketId } = ticket;

			// make sure to remove ticket from
			// all existing relations
			removeRelation({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
			});

			updateRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
				relationIds: priceIds,
			});

			priceIds.forEach((entityId) => {
				addRelation({
					entity: 'prices',
					entityId,
					relation: 'tickets',
					relationId: ticketId,
				});
			});
		}
	};

	return onUpdateTicket;
};

export default useOnUpdateTicket;
