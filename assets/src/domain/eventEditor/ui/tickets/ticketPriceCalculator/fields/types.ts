import React, { InputHTMLAttributes } from 'react';
import { PriceModifierProps, TpcPriceModifier } from '../types';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

type SupportedInputs = 'input' | 'select' | 'textarea';

export type FieldValue = string | number | boolean;

export interface BaseFieldProps<V = FieldValue> extends InputProps {
	children?: ((props: {}) => React.ReactNode) | React.ReactNode;
	component?: React.ComponentType | SupportedInputs;
	disabled?: boolean;
	name: string;
	format?: (value: V, name: string) => any;
	formatOnBlur?: boolean;
	parse?: (value: any, name: string) => V;
	getValue: () => V;
	setValue: (value: V) => void;
}

export interface UsePrice {
	getValue: () => FieldValue;
	setValue: (value: FieldValue) => void;
}

export interface PriceFieldProps
	extends PriceModifierProps,
		Omit<BaseFieldProps<number | string>, 'getValue' | 'setValue' | 'name'> {
	field: keyof TpcPriceModifier;
}

export interface TicketPriceFieldProps extends Omit<BaseFieldProps<number>, 'getValue' | 'setValue' | 'name'> {}
