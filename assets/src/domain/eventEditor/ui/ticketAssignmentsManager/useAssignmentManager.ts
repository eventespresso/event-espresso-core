import { useEffect } from 'react';
import { pick, map } from 'ramda';

import { useRelationsManager, RelationFunctionProps, RelationalData } from '@appServices/apollo/relations';
import { AssignmentManager } from './types';

type AM = AssignmentManager;
/**
 * A wrapper for relations manager.
 */
const useAssignmentManager = (): AM => {
	// Create a fresh instance to manage current relations/assignments
	// without modifying/mutating the existing relations
	const { setData, getData, getRelations, addRelation, removeRelation } = useRelationsManager();

	const getAssignedTickets: AM['getAssignedTickets'] = ({ datetimeId }) => {
		return getRelations({
			entity: 'datetimes',
			entityId: datetimeId,
			relation: 'tickets',
		});
	};

	const getAssignedDates: AM['getAssignedDates'] = ({ ticketId }) => {
		return getRelations({
			entity: 'tickets',
			entityId: ticketId,
			relation: 'datetimes',
		});
	};

	const addAssignment: AM['addAssignment'] = ({ datetimeId, ticketId }) => {
		updateAssignment({ datetimeId, ticketId });
	};

	// args are same
	const toggleAssignment: AM['addAssignment'] = ({ datetimeId, ticketId }) => {
		const assignedTickets = getAssignedTickets({ datetimeId });
		const remove = assignedTickets.includes(ticketId);
		updateAssignment({ datetimeId, ticketId, remove });
	};

	const removeAssignment: AM['removeAssignment'] = ({ datetimeId, ticketId }) => {
		updateAssignment({ datetimeId, ticketId, remove: true });
	};

	// args are same
	const updateAssignment: AM['removeAssignment'] = ({ datetimeId, ticketId, remove = false }) => {
		// relation from datetimes towards tickets
		const datetimeToTockets: RelationFunctionProps = {
			entity: 'datetimes',
			entityId: datetimeId,
			relation: 'tickets',
			relationId: ticketId,
		};
		// relation from tickets towards datetimes
		const ticketsToDatetimes: RelationFunctionProps = {
			entity: 'tickets',
			entityId: ticketId,
			relation: 'datetimes',
			relationId: datetimeId,
		};

		if (remove) {
			removeRelation(datetimeToTockets);
			removeRelation(ticketsToDatetimes);
		} else {
			// Add both ways relation for fast retieval
			addRelation(datetimeToTockets);
			addRelation(ticketsToDatetimes);
		}
	};

	const initialize: AM['initialize'] = (data: RelationalData) => {
		const relationsToPick: Array<keyof Pick<RelationalData, 'datetimes' | 'tickets'>> = ['datetimes', 'tickets'];
		// pick only datetimes and tickets from relational data
		let newData = pick(relationsToPick, data);

		// Remove other relations from newData
		// like ticket to price relations
		newData = map((relationalEntity) => {
			return map((relation) => {
				return pick(relationsToPick, relation);
			}, relationalEntity);
		}, newData);

		setData(newData);
	};

	return {
		getData,
		initialize,
		addAssignment,
		removeAssignment,
		toggleAssignment,
		getAssignedTickets,
		getAssignedDates,
	};
};

export default useAssignmentManager;
