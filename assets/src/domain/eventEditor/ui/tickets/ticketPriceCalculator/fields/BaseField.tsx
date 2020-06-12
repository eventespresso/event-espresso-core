import React from 'react';
import classNames from 'classnames';

import useBaseField from './useBaseField';
import { BaseFieldProps } from './types';

const BaseField: React.FC<BaseFieldProps> = ({
	children,
	component,
	name,
	format,
	formatOnBlur,
	parse,
	getValue,
	setValue,
	value,
	...props
}) => {
	const { fieldValue, handlers } = useBaseField({
		component,
		name,
		format,
		formatOnBlur,
		parse,
		getValue,
		setValue,
		value,
	});
	const className = classNames(props.className, 'ee-input-base ee-input', component === 'select' && 'ee-select');

	if (typeof component === 'string') {
		return React.createElement(component, { ...handlers, ...props, className, children, value: fieldValue });
	}

	return null;
};

export default BaseField;
