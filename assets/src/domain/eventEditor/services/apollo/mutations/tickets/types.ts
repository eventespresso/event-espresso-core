import { EntityId } from '../../types';

export interface TicketBaseInput {
	datetimes?: Array<EntityId>;
	description?: string;
	endDate?: string;
	isDefault?: boolean;
	isFree?: boolean;
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
	startDate?: string;
	uses?: number;
	wpUser?: number;
}

export type CreateTicketInput = TicketBaseInput;

export interface UpdateTicketInput extends TicketBaseInput {
	id?: EntityId;
}

export interface DeleteTicketInput {
	id?: EntityId;
}
