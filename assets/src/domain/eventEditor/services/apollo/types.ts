export type EntityId = string;
export type EntityDbId = number;

export interface Entity {
	id: EntityId;
	dbId: EntityDbId;
	name: string;
	__typename?: string;
}

export interface Trashable {
	isTrashed: boolean;
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

export interface Datetime extends Entity, Trashable {
	capacity: number;
	description: string;
	endDate: string;
	isActive: boolean;
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

export interface DatetimeItem {
	datetime: Datetime;
}

export type DatetimeEdge<Connection = 'EspressoRootQueryDatetimesConnection'> = EntityEdge<Datetime, Connection>;

export interface DatetimesList {
	espressoDatetimes: DatetimeEdge;
}

export interface Price extends Entity, Trashable {
	amount: number | string;
	desc: string;
	isBasePrice: boolean;
	isDefault: boolean;
	isDiscount: boolean;
	isPercent: boolean;
	isTax: boolean;
	order: number | string;
	overrides: string;
}

export type PriceEdge = EntityEdge<Price, 'EspressoRootQueryPricesConnection'>;

export interface PricesList {
	espressoPrices: PriceEdge;
}

export interface Ticket extends Entity, Trashable {
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

export interface TicketItem {
	ticket: Ticket;
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

export interface PriceType extends Entity, Trashable {
	baseType: PriceBasetype;
	isBasePrice: boolean;
	isDiscount: boolean;
	isPercent: boolean;
	isTax: boolean;
	order: number;
}

export type PriceTypeEdge = EntityEdge<PriceType, 'EspressoRootQueryPriceTypesConnection'>;

export interface PriceTypesList {
	espressoPriceTypes: PriceTypeEdge;
}
