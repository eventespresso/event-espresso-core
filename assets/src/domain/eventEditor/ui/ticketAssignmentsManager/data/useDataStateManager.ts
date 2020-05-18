import { useEffect, useCallback, useMemo } from 'react';

import { EntityId } from '@dataServices/types';
import { useRelations } from '@appServices/apollo/relations';
import { useAssignmentManager, useValidation } from './';
import { AssignmentStatus, BaseProps, DataStateManager } from '../types';

const useDataStateManager = (props: BaseProps): DataStateManager => {
	const assignmentManager = useAssignmentManager();
	// The existing relations to be used to create initial data
	// and to calculate difference between new and old data
	const relations = useRelations();
	const orphanEntities = useValidation(assignmentManager);

	const { initialize, isInitialized } = assignmentManager;
	const initialized = isInitialized();

	useEffect(() => {
		if (!initialized) {
			// initialize with existing data
			initialize({ data: relations.getData(), ...props });
		}
	}, [initialized]);

	const hasNoAssignedDates = useCallback(({ ticketId }) => orphanEntities.tickets.includes(ticketId), [
		orphanEntities.tickets,
	]);

	const hasNoAssignedTickets = useCallback(({ datetimeId }) => orphanEntities.datetimes.includes(datetimeId), [
		orphanEntities.datetimes,
	]);

	const hasOrphanTickets = useCallback(() => orphanEntities.tickets.length > 0, [orphanEntities.tickets]);

	const hasOrphanDates = useCallback(() => orphanEntities.datetimes.length > 0, [orphanEntities.datetimes]);

	const hasOrphanEntities = useCallback(() => hasOrphanTickets() || hasOrphanDates(), [
		hasOrphanDates,
		hasOrphanTickets,
	]);

	const getOldRelation = useCallback(
		({ datetimeId }): EntityId[] => {
			return relations.getRelations({
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
			});
		},
		[relations.getRelations]
	);

	const getAssignmentStatus = useCallback(
		({ datetimeId, ticketId }): AssignmentStatus => {
			const oldRelatedTickets = getOldRelation({ datetimeId });
			const newRelatedTickets = assignmentManager.getAssignedTickets({ datetimeId });

			const isInOld = oldRelatedTickets.includes(ticketId);
			const isInNew = newRelatedTickets.includes(ticketId);

			switch (true) {
				case isInOld && isInNew:
					return 'OLD';
				case !isInOld && isInNew:
					return 'NEW';
				case isInOld && !isInNew:
					return 'REMOVED';
				case !isInOld && !isInNew:
					return null;
			}
		},
		[assignmentManager.getAssignedTickets, getOldRelation]
	);

	return useMemo(
		() => ({
			...assignmentManager,
			getAssignmentStatus,
			hasNoAssignedDates,
			hasNoAssignedTickets,
			hasOrphanDates,
			hasOrphanEntities,
			hasOrphanTickets,
		}),
		[
			assignmentManager,
			getAssignmentStatus,
			hasNoAssignedDates,
			hasNoAssignedTickets,
			hasOrphanDates,
			hasOrphanEntities,
			hasOrphanTickets,
		]
	);
};

export default useDataStateManager;
