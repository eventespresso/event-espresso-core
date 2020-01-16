export type EntityId = string;
export type EntityDbId = number;

export interface Entity {
	id: EntityId;
	dbId: EntityDbId;
	name: string;
	__typename?: string;
}

export interface EntityEdge<E = Entity, ConnectionTypeName = string> {
	nodes: E[];
	__typename: ConnectionTypeName;
}

export enum DatetimeStatus {
	soldOut = 'DTS',
	active = 'DTA',
	upcoming = 'DTU',
	postponed = 'DTP',
	cancelled = 'DTC',
	expired = 'DTE',
	inactive = 'DTI',
}

export interface Datetime extends Entity {
	capacity: number;
	description: string;
	endDate: string;
	isActive: boolean;
	isDeleted: boolean; // TODO: refactor according to resolution from here: https://github.com/eventespresso/event-espresso-core/issues/2089
	isExpired: boolean;
	isPrimary: boolean;
	isSoldOut: boolean;
	isUpcoming: boolean;
	length: number;
	order: number;
	reserved: number;
	sold: number;
	startDate: string;
	status: DatetimeStatus;
}

export type DatetimeEdge<Connection = 'EspressoRootQueryDatetimesConnection'> = EntityEdge<Datetime, Connection>;

export interface DatetimesList {
	espressoDatetimes: DatetimeEdge;
}

export interface Price extends Entity {
	amount: number | string;
	desc: string;
	isBasePrice: boolean;
	isDefault: boolean;
	isDeleted: boolean;
	isDiscount: boolean;
	isPercent: boolean;
	isTax: boolean;
	order: number | string;
	overrides: string;
	priceTypeOrder: number | string;
}

export type PriceEdge = EntityEdge<Price, 'EspressoRootQueryPricesConnection'>;

export interface PricesList {
	espressoPrices: PriceEdge;
}

export interface Ticket extends Entity {
	description: string;
	endDate: string; // ISO string
	isDefault: boolean;
	isFree: boolean;
	isRequired: boolean;
	isSoldOut: boolean;
	isTaxable: boolean;
	max: number;
	min: number;
	order: number;
	price: number;
	prices?: PriceEdge; // for create and update ticket mutation
	quantity: number;
	reserved: number;
	reverseCalculate: boolean;
	sold: number;
	startDate: string; // ISO string
	uses: number;
}

export type TicketEdge = EntityEdge<Ticket, 'EspressoRootQueryTicketsConnection'>;

export interface TicketsList {
	espressoTickets: TicketEdge;
}

export enum PriceBasetype {
	BASE_PRICE = 'BASE_PRICE',
	DISCOUNT = 'DISCOUNT',
	SURCHARGE = 'SURCHARGE',
	TAX = 'TAX',
}

export interface PriceType extends Entity {
	baseType: PriceBasetype;
	isBasePrice: boolean;
	isDeleted: boolean;
	isDiscount: boolean;
	isPercent: boolean;
	isTax: boolean;
	order: number;
}

export type PriceTypeEdge = EntityEdge<PriceType, 'EspressoRootQueryPriceTypesConnection'>;

export interface PriceTypesList {
	espressoPriceTypes: PriceTypeEdge;
}
