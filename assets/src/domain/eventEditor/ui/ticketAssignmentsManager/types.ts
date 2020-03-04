import { EntityId } from '@appServices/apollo/types';
import { RelationsManager } from '@appServices/apollo/relations';
import { Datetime, Ticket } from '@edtrServices/apollo/types';
import { ColumnTitleProps } from 'antd/lib/table/interface';

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
	addAssignment: (args: AssignmentFnArgs) => void;
	getAssignedDates: (args: Pick<AssignmentFnArgs, 'ticketId'>) => EntityId[];
	getAssignedTickets: (args: Pick<AssignmentFnArgs, 'datetimeId'>) => EntityId[];
	getData: RelationsManager['getData'];
	initialize: RelationsManager['initialize'];
	removeAssignment: (args: SetAssignmentFnArgs) => void;
	toggleAssignment: (args: AssignmentFnArgs) => void;
}

export interface TAMStateManager extends Omit<AssignmentManager, 'initialize'> {
	getAssignmentStatus: (args: AssignmentFnArgs) => AssignmentStatus;
	hasNoAssignedDates: (options: Pick<AssignmentFnArgs, 'ticketId'>) => boolean;
	hasNoAssignedTickets: (options: Pick<AssignmentFnArgs, 'datetimeId'>) => boolean;
	hasOrphanDates: () => boolean;
	hasOrphanEntities: () => boolean;
	hasOrphanTickets: () => boolean;
}

export interface TicketAssignmentsManager {
	assignDatesToTicket: (options: Pick<AssignmentFnArgs, 'ticketId'>) => void;
	assignTicketsToDate: (options: Pick<AssignmentFnArgs, 'datetimeId'>) => void;
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

export interface TicketHeaderProps extends ColumnTitleProps<Datetime> {
	ticket: Ticket;
}
