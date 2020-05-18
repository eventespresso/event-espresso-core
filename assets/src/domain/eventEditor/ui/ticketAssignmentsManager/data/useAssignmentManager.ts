import { pick, map, mapObjIndexed, isEmpty } from 'ramda';

import { useRelationsManager, RelationFunctionProps, RelationalData } from '@appServices/apollo/relations';
import { AssignmentManager, InitializeProps, TAMRelationalData } from '../types';
import { useCallback, useMemo } from 'react';

type AM = AssignmentManager;

const relationsToPick: Array<keyof TAMRelationalData> = ['datetimes', 'tickets'];

/**
 * A wrapper for relations manager.
 */
const useAssignmentManager = (): AM => {
	// Create a fresh instance to manage current relations/assignments
	// without modifying/mutating the existing relations
	const {
		addRelation,
		getData,
		getRelations,
		initialize: initializeRelations,
		isInitialized,
		removeRelation,
	} = useRelationsManager();

	const getAssignedTickets = useCallback<AM['getAssignedTickets']>(
		({ datetimeId }) => {
			return getRelations({
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
			});
		},
		[getRelations]
	);

	const getAssignedDates = useCallback<AM['getAssignedDates']>(
		({ ticketId }) => {
			return getRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
			});
		},
		[getRelations]
	);

	// args are same
	const updateAssignment = useCallback<AM['removeAssignment']>(
		({ datetimeId, ticketId, remove = false }) => {
			// relation from datetimes towards tickets
			const datetimeToTickets: RelationFunctionProps<'datetimes'> = {
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
				relationId: ticketId,
			};
			// relation from tickets towards datetimes
			const ticketsToDatetimes: RelationFunctionProps<'tickets'> = {
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
				relationId: datetimeId,
			};

			if (remove) {
				removeRelation(datetimeToTickets);
				removeRelation(ticketsToDatetimes);
			} else {
				// Add both ways relation for fast retieval
				addRelation(datetimeToTickets);
				addRelation(ticketsToDatetimes);
			}
		},
		[addRelation, removeRelation]
	);

	const addAssignment = useCallback<AM['addAssignment']>(
		({ datetimeId, ticketId }) => {
			updateAssignment({ datetimeId, ticketId });
		},
		[updateAssignment]
	);

	// args are same
	const toggleAssignment = useCallback<AM['addAssignment']>(
		({ datetimeId, ticketId }) => {
			const assignedTickets = getAssignedTickets({ datetimeId });
			const remove = assignedTickets.includes(ticketId);
			updateAssignment({ datetimeId, ticketId, remove });
		},
		[getAssignedTickets, updateAssignment]
	);

	const removeAssignment = useCallback<AM['removeAssignment']>(
		({ datetimeId, ticketId }) => {
			updateAssignment({ datetimeId, ticketId, remove: true });
		},
		[updateAssignment]
	);

	const prepareRelationsForInit = useCallback(({ data, assignmentType, entity }: InitializeProps): RelationalData => {
		// pick only datetimes and tickets from relational data
		let newData = pick(relationsToPick, data);

		// Remove other relations from newData
		// like ticket to price relations
		return mapObjIndexed((relationalEntity, entityType) => {
			let relationalEntityToUse = relationalEntity;
			// If TAM is only for a single datetime/ticket
			// limit relations to that datetime/ticket
			if (
				(assignmentType === 'forDate' && entityType === 'datetimes') ||
				(assignmentType === 'forTicket' && entityType === 'tickets')
			) {
				relationalEntityToUse = pick([entity.id], relationalEntity);
				// if it's for a new date or ticket
				if (isEmpty(relationalEntityToUse)) {
					const newRelationKey = entityType === 'datetimes' ? 'tickets' : 'datetimes';
					// init to empty relations
					relationalEntityToUse[entity.id] = {
						[newRelationKey]: [],
					};
				}
			}

			return map((relation) => {
				return pick(relationsToPick, relation);
			}, relationalEntityToUse);
		}, newData);
	}, []);

	const initialize = useCallback<AM['initialize']>(
		(props) => {
			const newData = prepareRelationsForInit(props);
			initializeRelations(newData);
		},
		[initializeRelations]
	);

	return useMemo(
		() => ({
			addAssignment,
			getAssignedDates,
			getAssignedTickets,
			getData,
			initialize,
			isInitialized,
			removeAssignment,
			toggleAssignment,
		}),
		[
			addAssignment,
			getAssignedDates,
			getAssignedTickets,
			getData,
			initialize,
			isInitialized,
			removeAssignment,
			toggleAssignment,
		]
	);
};

export default useAssignmentManager;
