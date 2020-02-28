import { EntityId } from '@appServices/apollo/types';
import { RelationsManager } from '@appServices/apollo/relations';

type AssignmentType = 'forDate' | 'forTicket' | 'forAll';

export interface TAMProps {
	assignmentType: AssignmentType;
	entityId?: EntityId;
}

interface SetAssignmentFnArgs {
	datetimeId: EntityId;
	ticketId: EntityId;
	remove?: boolean;
}

type GetAssignmentFnArgs = Partial<Omit<SetAssignmentFnArgs, 'remove'>>;

export interface AssignmentManager {
	getData: RelationsManager['getData'];
	initialize: RelationsManager['setData'];
	addAssignment: (args: SetAssignmentFnArgs) => void;
	removeAssignment: (args: SetAssignmentFnArgs) => void;
	getAssignedTickets: (args: GetAssignmentFnArgs) => EntityId[];
	getAssignedDates: (args: GetAssignmentFnArgs) => EntityId[];
}

export interface TAMStateManager extends Omit<AssignmentManager, 'initialize'> {
	hasNoAssignedDates: (options: Pick<GetAssignmentFnArgs, 'ticketId'>) => boolean;
	hasNoAssignedTickets: (options: Pick<GetAssignmentFnArgs, 'datetimeId'>) => boolean;
}

export interface TicketAssignmentsManager {
	assignTicketsToDate: (options: Pick<GetAssignmentFnArgs, 'datetimeId'>) => void;
	assignDatesToTicket: (options: Pick<GetAssignmentFnArgs, 'ticketId'>) => void;
	assignToAll: () => void;
}
