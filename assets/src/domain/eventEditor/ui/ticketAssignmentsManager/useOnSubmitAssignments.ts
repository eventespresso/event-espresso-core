import { useCallback } from 'react';
import { pathOr, filter, equals } from 'ramda';

import { useRelations, RelationalEntity, PossibleRelation } from '@appServices/apollo/relations';
import { EntityId } from '@appServices/apollo/types';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const useOnSubmitAssignments = () => {
	const { getData } = useRelations();
	const { updateEntity: updateDatetime } = useDatetimeMutator();

	return useCallback(
		async (data): Promise<void> => {
			const existingData = pathOr<RelationalEntity>({}, ['datetimes'], getData());
			const newData = pathOr<RelationalEntity>({}, ['datetimes'], data);

			// prepare the list of dates that need to be mutated
			// avoid updating the dates that haven't changed.
			const datesToUpdate = filter<[EntityId, PossibleRelation]>(([entityId, possibleRelation]) => {
				const newRelatedTickets = pathOr<EntityId[]>([], ['tickets'], possibleRelation);
				const oldRelatedTickets = pathOr<EntityId[]>([], [entityId, 'tickets'], existingData);
				// make sure to sort them before compare
				// to make sure that they are actually different
				return !equals(newRelatedTickets.sort(), oldRelatedTickets.sort());
			}, Object.entries(newData));

			datesToUpdate.forEach(([id, possibleRelation]) => {
				const tickets = pathOr<EntityId[]>([], ['tickets'], possibleRelation);
				updateDatetime({ id, tickets });
			});
		},
		[getData, updateDatetime]
	);
};

export default useOnSubmitAssignments;
