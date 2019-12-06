import useRelations from '../../../../../infrastructure/services/relations/useRelations';

const useOnUpdateDatetime = () => {
	const { updateRelations, addRelation, removeRelation } = useRelations();

	const onUpdateDatetime = ({ datetime, tickets }) => {
		if (datetime.id && tickets.length) {
			const { id: datetimeId } = datetime;

			// make sure to remove datetime from
			// all existing relations
			removeRelation({
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
			});

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
	};

	return onUpdateDatetime;
};

export default useOnUpdateDatetime;
