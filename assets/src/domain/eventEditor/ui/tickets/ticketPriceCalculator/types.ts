import { Entity, EntityId, Price, Ticket } from '../../../services/apollo/types';
import { EspressoButtonProps } from '@application/ui/input';

export interface AddPriceModifierDataProps extends WithPriceModifierProp {
	name: string;
	push: (price: TpcPriceModifier) => void;
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

export interface PriceInputProps extends WithPriceModifierProp {
	name: string;
}

export interface TpcPriceModifier extends Price {
	amount: number;
	desc: string;
	isBasePrice: boolean;
	isDefault: boolean;
	isDiscount: boolean;
	isPercent: boolean;
	isTax: boolean;
	order: number;
	overrides: number;
	priceType: EntityId;
	priceTypeOrder: number | string;
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

export interface TpcButtonDataProps extends Partial<EspressoButtonProps> {
	ticketId: EntityId;
}

export type TpcCallback = (func: any) => UpdatedTpcFormDataPath;

export interface TpcFormData extends WithPriceModifierArrayProp, WithTicketProp {}

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

export interface TpcModifierFormRowProps extends FieldArrayProps, WithPriceModifierProp, WithRevCalc {
	index?: number;
	name?: string;
}

export interface TpcFormMutators extends WithToggleCalcDir {
	map: <R>(iterator: (name: string, index: number) => R) => R[];
	push: (value: TpcPriceModifier) => void;
	remove: (index: number) => TpcPriceModifier;
	reset: (name: string) => void;
	sort: () => void;
	value: TpcPriceModifier[];
}

export interface UpdatedTpcFormDataPath {
	[key: string]: string | number | Entity;
}

export interface WithPriceModifierProp {
	price: TpcPriceModifier;
}

export interface WithPriceModifierArrayProp {
	prices: TpcPriceModifier[];
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
