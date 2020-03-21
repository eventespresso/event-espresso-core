import React, { useCallback, InputHTMLAttributes } from 'react';

import { PriceModifierProps, TpcPriceModifier } from '../types';
import { useDataState } from '../data';

type SupportedInputs = 'input' | 'select' | 'textarea';

type FieldValue = number | string | boolean;

interface PriceFieldProps<V = FieldValue, P = {}> extends PriceModifierProps, InputHTMLAttributes<HTMLInputElement> {
	children?: ((props: P) => React.ReactNode) | React.ReactNode;
	component: React.ComponentType<P> | SupportedInputs;
	field: keyof TpcPriceModifier;
	format?: <T = V>(value: T, name: keyof TpcPriceModifier) => any;
	formatOnBlur?: boolean;
	parse?: <T = V>(value: any, name: keyof TpcPriceModifier) => T;
}

const defaultFormat: PriceFieldProps['format'] = (value, name) => (value === undefined ? '' : value);
const defaultParse: PriceFieldProps['parse'] = (value, name) => (value === '' ? undefined : value);

const PriceField = <V extends FieldValue, P extends {}>({
	children,
	component,
	field,
	format = defaultFormat,
	formatOnBlur,
	parse = defaultParse,
	price,
	value: fieldValue,
	...rest
}: PriceFieldProps<V, P>): ReturnType<React.FC<PriceFieldProps<V, P>>> => {
	const { updatePrice } = useDataState();

	const handlers: InputHTMLAttributes<HTMLInputElement> = {
		onBlur: React.useCallback(() => {
			if (formatOnBlur) {
				const value = price[field];
				updatePrice({ id: price.id, fieldValues: { [field]: format(value, field) } });
			}
		}, [field, format, formatOnBlur, updatePrice, price]),
		onChange: useCallback(
			(event) => {
				const value = event?.target?.value;
				updatePrice({ id: price.id, fieldValues: { [field]: parse(value, field) } });
			},
			[field, parse, updatePrice, price]
		),
	};

	let value = fieldValue || price[field];
	if (formatOnBlur) {
		if (component === 'input') {
			value = defaultFormat(value, field);
		}
	} else {
		value = format(value, field);
	}
	if (value === null) {
		value = '';
	}

	if (typeof component === 'string') {
		return React.createElement(component, { ...handlers, ...rest, children, value });
	}
	return null;
};

export default PriceField;
