import { Price, Ticket } from '../../data/types';

export interface AddPriceModifierDataProps extends WithPriceProp {
	modifiers: Price[];
	name: string;
	push: (price: Price) => void;
	reset: (name: string) => void;
	sort: () => void;
}

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
	type: string;
}

export interface TpcButtonDataProps extends WithTicketProp {
	isOpen: boolean;
	onClose: () => void;
	onOpen?: () => void;
}

export interface TpcFormData extends WithPriceArrayProp, WithTicketProp {}

export interface TpcForm extends WithTicketProp {
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
	modifierOptions?: Price[];
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
	[key: string]: string | number;
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
