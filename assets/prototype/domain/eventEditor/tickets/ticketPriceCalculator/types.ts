import { Price } from '../../data/types';

export interface TicketPriceCalculatorMutators {
	map: <R>(iterator: (name: string, index: number) => R) => R[];
	push: (value: Price) => void;
	remove: (index: number) => Price;
	reset: (name: string) => void;
	sort: () => void;
	value: Price[];
}

export interface FieldArrayProps {
	fields: TicketPriceCalculatorMutators;
}

export interface PriceInputProps {
	name: string;
	price: Price;
}
