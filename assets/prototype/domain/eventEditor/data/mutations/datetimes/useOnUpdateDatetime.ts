import { useRelations, RelationsManager } from '../../../../../application/services/apollo/relations';
import { DatetimeMutationCallbackFn, DatetimeMutationCallbackFnArgs } from '../types';

const useOnUpdateDatetime = (): DatetimeMutationCallbackFn => {
	const { updateRelations, addRelation, removeRelation } = useRelations() as RelationsManager;

	const onUpdateDatetime = ({ datetime, tickets }: DatetimeMutationCallbackFnArgs): void => {
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
