import { EntityId } from '@appServices/apollo/types';
import { RelationsManager } from '@appServices/apollo/relations';
import { Datetime, Ticket } from '@edtrServices/apollo/types';

export type AssignmentType = 'forDate' | 'forTicket' | 'forAll';

export type AssignmentStatus = 'OLD' | 'NEW' | 'REMOVED';

export interface TAMProps {
	assignmentType: AssignmentType;
	entityId?: EntityId;
}

export interface AssignmentFnArgs {
	datetimeId: EntityId;
	ticketId: EntityId;
}

export interface SetAssignmentFnArgs extends AssignmentFnArgs {
	remove?: boolean;
}

export interface AssignmentManager {
	getData: RelationsManager['getData'];
	initialize: RelationsManager['setData'];
	addAssignment: (args: AssignmentFnArgs) => void;
	removeAssignment: (args: SetAssignmentFnArgs) => void;
	toggleAssignment: (args: AssignmentFnArgs) => void;
	getAssignedTickets: (args: Pick<AssignmentFnArgs, 'datetimeId'>) => EntityId[];
	getAssignedDates: (args: Pick<AssignmentFnArgs, 'ticketId'>) => EntityId[];
}

export interface TAMStateManager extends Omit<AssignmentManager, 'initialize'> {
	hasNoAssignedDates: (options: Pick<AssignmentFnArgs, 'ticketId'>) => boolean;
	hasNoAssignedTickets: (options: Pick<AssignmentFnArgs, 'datetimeId'>) => boolean;
	hasOrphanTickets: () => boolean;
	hasOrphanDates: () => boolean;
	hasOrphanEntities: () => boolean;
	getAssignmentStatus: (args: AssignmentFnArgs) => AssignmentStatus;
}

export interface TicketAssignmentsManager {
	assignTicketsToDate: (options: Pick<AssignmentFnArgs, 'datetimeId'>) => void;
	assignDatesToTicket: (options: Pick<AssignmentFnArgs, 'ticketId'>) => void;
	assignToAll: () => void;
}

export interface DatesAndTickets {
	datetimes: Datetime[];
	tickets: Ticket[];
}

export interface RenderTableProps extends DatesAndTickets {}

export interface RenderCellProps {
	datetime: Datetime;
	ticket: Ticket;
}
