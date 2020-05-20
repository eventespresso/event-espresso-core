import React, { useCallback } from 'react';
import classNames from 'classnames';

import { BaseFieldProps, FieldValue, InputProps } from './types';

const defaultFormat: BaseFieldProps['format'] = (value, name) => (value === undefined ? '' : value);
const defaultParse: BaseFieldProps['parse'] = (value, name) => (value === '' ? undefined : value);

const BaseField: React.FC<BaseFieldProps> = ({
	children,
	component,
	name,
	format = defaultFormat,
	formatOnBlur,
	parse = defaultParse,
	getValue,
	setValue,
	value,
	...props
}) => {
	const className = classNames(
		props.className,
		'ee-input-base ee-input',
		component === 'select' && 'ee-select',
	);

	const handlers: InputProps = {
		onBlur: useCallback(() => {
			if (formatOnBlur) {
				setValue(format(getValue(), name));
			}
		}, [name, format, formatOnBlur, setValue, getValue]),
		onChange: useCallback(
			(event) => {
				const value = event?.target?.value;
				setValue(parse(value, name));
			},
			[name, parse, setValue]
		),
	};

	let fieldValue = (value || getValue()) as FieldValue;

	if (formatOnBlur) {
		if (component === 'input') {
			fieldValue = defaultFormat(fieldValue, name);
		}
	} else {
		fieldValue = format(fieldValue, name);
	}

	if (fieldValue === null) {
		fieldValue = '';
	}

	if (typeof component === 'string') {
		return React.createElement(component, { ...handlers, ...props, className, children, value: fieldValue });
	}

	return null;
};

export default BaseField;
