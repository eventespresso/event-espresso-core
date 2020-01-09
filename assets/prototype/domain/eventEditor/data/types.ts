import { Status } from './date/types';

export type EntityId = string;

export interface Entity {
	id: EntityId;
	dbId?: number;
	name?: string;
	__typename?: string;
}

export interface EntityEdge {
	nodes?: Entity[];
	__typename?: string;
}

export interface Datetime extends Entity {
	capacity?: number;
	description?: string;
	endDate?: string;
	isActive?: boolean;
	isDeleted?: boolean; // TODO: refactor according to resolution from here: https://github.com/eventespresso/event-espresso-core/issues/2089
	isExpired?: boolean;
	isPrimary?: boolean;
	isSoldOut?: boolean;
	isUpcoming?: boolean;
	length?: number;
	order?: number;
	reserved?: number;
	sold?: number;
	startDate?: string;
	status?: keyof typeof Status;
}

export interface DatetimeEdge extends EntityEdge {
	nodes?: Datetime[];
}

export interface Price extends Entity {
	amount?: number;
	desc?: string;
	isBasePrice?: boolean;
	isDefault?: boolean;
	isDeleted?: boolean;
	isDiscount?: boolean;
	isPercent?: boolean;
	isTax?: boolean;
	order?: number;
	overrides?: string;
	priceTypeOrder?: number;
}

export interface PriceEdge extends EntityEdge {
	nodes?: Price[];
}

export interface Ticket extends Entity {
	description?: string;
	endDate?: string; // ISO string
	isDefault?: boolean;
	isFree?: boolean;
	isRequired?: boolean;
	isSoldOut?: boolean;
	isTaxable?: boolean;
	max?: number;
	min?: number;
	order?: number;
	price?: number;
	prices?: PriceEdge; // for create and update ticket mutation
	quantity?: number;
	reserved?: number;
	reverseCalculate?: boolean;
	sold?: number;
	startDate?: string; // ISO string
	uses?: number;
}

export interface TicketEdge extends EntityEdge {
	nodes?: Ticket[];
}

export enum PriceBasetype {
	BASE_PRICE = 'BASE_PRICE',
	DISCOUNT = 'DISCOUNT',
	SURCHARGE = 'SURCHARGE',
	TAX = 'TAX',
}

export interface PriceType extends Entity {
	baseType?: PriceBasetype;
	isBasePrice?: boolean;
	isDeleted?: boolean;
	isDiscount?: boolean;
	isPercent?: boolean;
	isTax?: boolean;
	order?: number;
}

export interface PriceTypeEdge extends EntityEdge {
	nodes?: PriceType[];
}
