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
	parse?: <T = V>(value: any, name: keyof TpcPriceModifier) => T;
}

const defaultFormat: PriceFieldProps['format'] = (value, name) => (value === undefined ? '' : value);
const defaultParse: PriceFieldProps['parse'] = (value, name) => (value === '' ? undefined : value);

const PriceField = <V extends FieldValue, P extends {}>({
	children,
	component,
	field,
	format = defaultFormat,
	parse = defaultParse,
	price,
	value: fieldValue,
	...rest
}: PriceFieldProps<V, P>): ReturnType<React.FC<PriceFieldProps<V, P>>> => {
	const { updatePrice } = useDataState();

	const handlers: InputHTMLAttributes<HTMLInputElement> = {
		onChange: useCallback(
			(event) => {
				const value: any = event?.target?.value || event;
				updatePrice({ id: price.id, fieldValues: { [field]: parse(value, field) } });
			},
			[parse, updatePrice, price.amount]
		),
	};

	const value = format(fieldValue || price[field], field);

	if (typeof component === 'string') {
		return React.createElement(component, { ...handlers, ...rest, children, value });
	}
	return null;
};

export default PriceField;
