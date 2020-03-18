import { useEffect } from 'react';

import { EntityId } from '@appServices/apollo/types';
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

	const { assignmentType, entityId } = props;
	useEffect(() => {
		if (!initialized) {
			// If TAM is only for a single datetime
			// limit relations to that datetime
			const forDate = assignmentType === 'forDate' ? entityId : null;
			// initialize with existing data
			initialize(relations.getData(), forDate);
		}
	}, [initialized]);

	const hasNoAssignedDates = ({ ticketId }) => orphanEntities.tickets.includes(ticketId);

	const hasNoAssignedTickets = ({ datetimeId }) => orphanEntities.datetimes.includes(datetimeId);

	const hasOrphanTickets = () => orphanEntities.tickets.length > 0;

	const hasOrphanDates = () => orphanEntities.datetimes.length > 0;

	const hasOrphanEntities = () => hasOrphanTickets() || hasOrphanDates();

	const getOldRelation = ({ datetimeId }): EntityId[] => {
		return relations.getRelations({
			entity: 'datetimes',
			entityId: datetimeId,
			relation: 'tickets',
		});
	};

	const getAssignmentStatus = ({ datetimeId, ticketId }): AssignmentStatus => {
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
	};

	return {
		...assignmentManager,
		getAssignmentStatus,
		hasNoAssignedDates,
		hasNoAssignedTickets,
		hasOrphanDates,
		hasOrphanEntities,
		hasOrphanTickets,
	};
};

export default useDataStateManager;
