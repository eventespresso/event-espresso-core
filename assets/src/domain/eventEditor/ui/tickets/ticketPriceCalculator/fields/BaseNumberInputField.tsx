import React, { useCallback } from 'react';
import classNames from 'classnames';

import { BaseFieldProps, FieldValue, InputProps } from './types';
import { NumberInput } from '@infraUI/inputs';

import useBaseField from './useBaseField';

const BaseNumberInputField: React.FC<BaseFieldProps> = ({
	children,
	component,
	disabled,
	name,
	format,
	formatOnBlur,
	parse,
	placeholder,
	getValue,
	setValue,
	value,
	...props
}) => {
	const className = classNames(props.className, 'ee-input-base ee-input');
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

	return (
		<NumberInput
			className={className}
			// because it can affect other tickets that have this price
			// default price amount should not be changeable
			disabled={disabled}
			placeholder={placeholder}
			value={fieldValue}
			{...handlers}
		/>
	);
};

export default BaseNumberInputField;
