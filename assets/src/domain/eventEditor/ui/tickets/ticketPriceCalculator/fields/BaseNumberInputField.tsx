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
	const [fieldValue, setFieldValue] = React.useState(Number(value ?? getValue()));

	const className = classNames(props.className, 'ee-input-base ee-input');
	const onChange = useCallback(
		(value) => {
			setFieldValue(value);
			setValue(parse(value, name));
		},
		[name, parse, setValue]
	);

	return (
		<NumberInput
			// because it can affect other tickets that have this price
			// default price amount should not be changeable
			disabled={disabled}
			showStepper={false}
			onChange={onChange}
			placeholder={placeholder}
			value={fieldValue}
		/>
	);
};

export default BaseNumberInputField;
