import { useCallback } from 'react';

import { useRelations } from '@appServices/apollo/relations';
import { useDatetimeMutator, useTicketMutator, UpdateTicketInput } from '@edtrServices/apollo/mutations';
import { prepareEntitiesForUpdate, ticketsWithNewQuantity } from '../utils';
import { TAMRelationalData } from '../types';
import { useDatetimes, useTickets } from '@edtrServices/apollo/queries';
import { EntityId } from '@dataServices/types';

const useOnSubmitAssignments = () => {
	const { getData: getExistingData } = useRelations();
	const { updateEntity: updateDatetime } = useDatetimeMutator();
	const { updateEntity: updateTicket } = useTicketMutator();

	const allDates = useDatetimes();
	const allTickets = useTickets();

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

			const ticketsWithChangedQuantity = ticketsWithNewQuantity({
				allDates,
				allTickets,
				existingData,
				ticketsToUpdate,
			});

			// Tickets which will be updated in the below loop
			const updatedTickets: Array<EntityId> = [];

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
					const datetimes = possibleRelation?.datetimes || [];
					const input: UpdateTicketInput = { id, datetimes };
					// if an entry exists in changed quantity map
					// lets use this oppurtunity to update the quantity here
					// to reduce the number of mutation requests
					if (ticketsWithChangedQuantity?.[id]) {
						input.quantity = ticketsWithChangedQuantity?.[id];
						// mark the ticket as already updated
						updatedTickets.push(id);
					}
					updateTicket(input);
				});
			} else {
				datesToUpdate.forEach(([id, possibleRelation]) => {
					const tickets = possibleRelation?.tickets || [];
					updateDatetime({ id, tickets });
				});
			}

			// now we finally update the ticket quantities
			Object.entries(ticketsWithChangedQuantity).forEach(([id, quantity]) => {
				updateTicket({ id, quantity });
			});
		},
		[allDates, allTickets, getExistingData, updateDatetime, updateTicket]
	);
};

export default useOnSubmitAssignments;
