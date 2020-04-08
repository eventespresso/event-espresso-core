import { EntityId } from '@appServices/apollo/types';
import { RelationsManager, RelationalData, PossibleRelation } from '@appServices/apollo/relations';
import { Datetime, Ticket } from '@edtrServices/apollo/types';

export type TAMRelationEntity = 'datetimes' | 'tickets';

export type TAMPossibleRelation = Pick<PossibleRelation<null>, TAMRelationEntity>;

export type TAMRelationalEntity = {
	[key: string]: TAMPossibleRelation;
};

export type TAMRelationalData = Pick<RelationalData, TAMRelationEntity>;

export type AssignmentType = 'forDate' | 'forTicket' | 'forAll';

export type AssignmentStatus = 'OLD' | 'NEW' | 'REMOVED';

export interface BaseProps {
	assignmentType: AssignmentType;
	entityId?: EntityId;
	title?: string;
}

export interface AssignmentFnArgs {
	datetimeId: EntityId;
	name?: string;
	ticketId: EntityId;
}

export interface SetAssignmentFnArgs extends AssignmentFnArgs {
	remove?: boolean;
}

interface InitializeProps extends BaseProps {
	data: TAMRelationalData;
}

export interface AssignmentManager {
	addAssignment: (args: AssignmentFnArgs) => void;
	getAssignedDates: (args: Pick<AssignmentFnArgs, 'ticketId'>) => EntityId[];
	getAssignedTickets: (args: Pick<AssignmentFnArgs, 'datetimeId'>) => EntityId[];
	getData: RelationsManager['getData'];
	initialize: (props: InitializeProps) => void;
	isInitialized: RelationsManager['isInitialized'];
	removeAssignment: (args: SetAssignmentFnArgs) => void;
	toggleAssignment: (args: AssignmentFnArgs) => void;
}

export interface DataStateManager extends AssignmentManager {
	getAssignmentStatus: (args: AssignmentFnArgs) => AssignmentStatus;
	hasNoAssignedDates: (options: Pick<AssignmentFnArgs, 'ticketId'>) => boolean;
	hasNoAssignedTickets: (options: Pick<AssignmentFnArgs, 'datetimeId'>) => boolean;
	hasOrphanDates: () => boolean;
	hasOrphanEntities: () => boolean;
	hasOrphanTickets: () => boolean;
}

export interface TicketAssignmentsManager {
	assignDatesToTicket: (options: Pick<AssignmentFnArgs, 'name' | 'ticketId'>) => void;
	assignTicketsToDate: (options: Pick<AssignmentFnArgs, 'datetimeId' | 'name'>) => void;
	assignToAll: () => void;
}

export interface DatesAndTickets {
	datetimes: Datetime[];
	tickets: Ticket[];
}

export interface RenderTableProps extends DatesAndTickets {}

export interface RenderCellProps {
	datetime?: Datetime;
	ticket?: Ticket;
}
