import { useCallback } from 'react';
import { pathOr } from 'ramda';

import { useRelations } from '@appServices/apollo/relations';
import { EntityId } from '@appServices/apollo/types';
import { useDatetimeMutator, useTicketMutator } from '@edtrServices/apollo/mutations';
import { prepareEntitiesForUpdate } from '../utils';
import { TAMRelationalData } from '../types';

const useOnSubmitAssignments = () => {
	const { getData: getExistingData } = useRelations();
	const { updateEntity: updateDatetime } = useDatetimeMutator();
	const { updateEntity: updateTicket } = useTicketMutator();

	return useCallback(
		async (data: TAMRelationalData): Promise<void> => {
			const existingData = getExistingData();

			/**
			 * Lets prepare a list of dates and tickets that need to be mutated
			 * avoiding updating the ones that haven't changed.
			 */
			const datesToUpdate = prepareEntitiesForUpdate({
				entity: 'datetimes',
				existingData,
				newData: data,
				relation: 'tickets',
			});
			const ticketsToUpdate = prepareEntitiesForUpdate({
				entity: 'tickets',
				existingData,
				newData: data,
				relation: 'datetimes',
			});

			/**
			 * Now we have both dates and tickets list ready.
			 * To reduce the number of mutation requests,
			 * we will update the list that is less in size,
			 * because the relation can be updated both ways.
			 *
			 * PS: Separate loops to avoid TS mess and make type checks strict.
			 */
			if (ticketsToUpdate.length < datesToUpdate.length) {
				ticketsToUpdate.forEach(([id, possibleRelation]) => {
					const datetimes = pathOr<EntityId[]>([], ['datetimes'], possibleRelation);
					updateTicket({ id, datetimes });
				});
			} else {
				datesToUpdate.forEach(([id, possibleRelation]) => {
					const tickets = pathOr<EntityId[]>([], ['tickets'], possibleRelation);
					updateDatetime({ id, tickets });
				});
			}
		},
		[getExistingData, updateDatetime, updateTicket]
	);
};

export default useOnSubmitAssignments;
