import { Entity, Price, PriceType, Ticket } from '../../data/types';

export interface AddPriceModifierDataProps extends WithPriceProp {
	name: string;
	push: (price: Price) => void;
	reset: (name: string) => void;
	sort: () => void;
}

export type FnCallback = (func: any) => void;

export interface FieldArrayProps {
	fields: TpcFormMutators;
}

export interface FormProps {
	mutators: TpcFormMutators;
}

export interface PriceInputProps extends WithPriceProp {
	name: string;
}

export interface TpcAction {
	data: TpcFormData;
	path: string;
	type: TpcActionType;
}

export enum TpcActionType {
	CalculateBasePrice = 'CALCULATE_BASE_PRICE',
	CalculateTicketTotal = 'CALCULATE_TICKET_TOTAL',
}

export interface TpcButtonDataProps {
	ticketId: EntityId;
}

export type TpcCallback = (func: any) => UpdatedTpcFormDataPath;

export interface TpcFormData extends WithPriceArrayProp, WithTicketProp {}

export interface TpcForm {
	form: FormProps;
	values: WithTicketProp;
}

export interface TpcFormElement extends WithRevCalc, WithTicketProp, WithToggleCalcDir {}

export interface TpcModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen?: () => void;
}

export interface TpcModifierFormRowProps extends FieldArrayProps, WithPriceProp, WithRevCalc {
	index?: number;
	modifierOptions?: PriceType[];
	name?: string;
}

export interface TpcFormMutators extends WithToggleCalcDir {
	map: <R>(iterator: (name: string, index: number) => R) => R[];
	push: (value: Price) => void;
	remove: (index: number) => Price;
	reset: (name: string) => void;
	sort: () => void;
	value: Price[];
}

export interface UpdatedTpcFormDataPath {
	[key: string]: string | number | Entity;
}

export interface WithPriceProp {
	price: Price;
}

export interface WithPriceArrayProp {
	prices: Price[];
}

export interface WithRevCalc {
	reverseCalculate?: boolean;
}

export interface WithTicketProp {
	ticket: Ticket;
}

export interface WithToggleCalcDir {
	toggleCalcDir: () => void;
}
