import { Entity, EntityEdge, Trashable } from '@dataServices/types';
import { DatetimesList as DatetimeList, TicketsList as TicketList } from '@dataServices/apollo/queries';

export interface Event extends Entity {
	description: string;
	isActive: boolean;
	isCancelled: boolean;
	isExpired: boolean;
	isInactive: boolean;
	isPostponed: boolean;
	isSoldOut: boolean;
	isUpcoming: boolean;
	name: string;
	order: number;
	shortDescription: string;
}

export interface EventData {
	espressoEventBy: Event;
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
	name: string;
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

export type DatetimesList = DatetimeList<DatetimeEdge>;

export interface Price extends Entity, Trashable {
	amount: number;
	description: string;
	isBasePrice: boolean;
	isDefault: boolean;
	isDiscount: boolean;
	isPercent: boolean;
	isTax: boolean;
	name: string;
	order: number;
	overrides: number;
}

export type PriceEdge = EntityEdge<Price, 'EspressoRootQueryPricesConnection'>;

export interface PricesList {
	espressoPrices: PriceEdge;
}

export interface Ticket extends Entity, Trashable {
	description: string;
	endDate: string; // ISO string
	isDefault: boolean;
	isExpired: boolean;
	isFree: boolean;
	isOnSale: boolean;
	isPending: boolean;
	isRequired: boolean;
	isSoldOut: boolean;
	isTaxable: boolean;
	max: number;
	min: number;
	name: string;
	order: number;
	price: number;
	prices?: PriceEdge; // for create and update ticket mutation
	quantity: number;
	registrationCount: number;
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

export type TicketsList = TicketList<TicketEdge>;

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
	name: string;
	order: number;
}

export type PriceTypeEdge = EntityEdge<PriceType, 'EspressoRootQueryPriceTypesConnection'>;

export interface PriceTypesList {
	espressoPriceTypes: PriceTypeEdge;
}
