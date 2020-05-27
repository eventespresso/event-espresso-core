import { EntityId } from '@dataServices/types';
import { Ticket } from '@edtrServices/apollo/types';

export interface TicketBaseInput {
	datetimes?: Array<EntityId>;
	description?: string;
	endDate?: string | Date;
	isDefault?: boolean;
	isRequired?: boolean;
	isTaxable?: boolean;
	isTrashed?: boolean;
	max?: number;
	min?: number;
	name?: string;
	order?: number;
	parent?: string;
	price?: number;
	prices?: Array<EntityId>;
	quantity?: number;
	reserved?: number;
	reverseCalculate?: boolean;
	row?: number;
	sold?: number;
	startDate?: string | Date;
	uses?: number;
	wpUser?: number;
}

export type CreateTicketInput = TicketBaseInput;

export interface UpdateTicketInput extends TicketBaseInput {
	id?: EntityId;
}

export interface DeleteTicketInput {
	id?: EntityId;
	deletePermanently?: boolean;
}

export interface TicketCommonInput extends TicketBaseInput, DeleteTicketInput {}

export type TicketMutationResult = {
	espressoTicket: Ticket;
};

export type CreateTicketResult = {
	createEspressoTicket: TicketMutationResult;
};

export type UpdateTicketResult = {
	updateEspressoTicket: TicketMutationResult;
};

export type DeleteTicketResult = {
	createEspressoTicket: TicketMutationResult;
};
