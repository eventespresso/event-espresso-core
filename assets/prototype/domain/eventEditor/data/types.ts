export interface Entity {
	id: string;
	dbId?: number;
	name?: string;
	__typename?: string;
}
export interface EntityEgde {
	nodes?: Entity[];
	__typename?: string;
}

export interface Datetime extends Entity {
	capacity?: number;
	description?: string;
	endDate?: string;
	isActive?: boolean;
	isExpired?: boolean;
	isPrimary?: boolean;
	isSoldOut?: boolean;
	isUpcoming?: boolean;
	length?: number;
	order?: number;
	reserved?: number;
	sold?: number;
	startDate?: string;
}

export interface DatetimeEdge extends EntityEgde {
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

export interface PriceEdge extends EntityEgde {
	nodes?: Price[];
}

export interface Ticket extends Entity {
	description?: string;
	endDate?: string;
	isDefault?: boolean;
	isFree?: boolean;
	isRequired?: boolean;
	isTaxable?: boolean;
	max?: number;
	min?: number;
	order?: number;
	price?: number;
	quantity?: number;
	reserved?: number;
	reverseCalculate?: boolean;
	sold?: number;
	startDate?: string;
	uses?: number;
	prices?: PriceEdge; // for create and update ticket mutation
}

export interface TicketEdge extends EntityEgde {
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

export interface PriceTypeEdge extends EntityEgde {
	nodes?: PriceType[];
}
