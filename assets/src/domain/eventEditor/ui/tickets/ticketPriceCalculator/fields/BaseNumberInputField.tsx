import React, { useCallback } from 'react';

import { BaseFieldProps } from './types';
import { NumberInput } from '@infraUI/inputs';

const BaseNumberInputField: React.FC<BaseFieldProps> = ({
	disabled,
	name,
	format,
	formatOnBlur,
	parse,
	placeholder,
	getValue,
	setValue,
	value,
}) => {
	const fieldValue = Number(value ?? getValue());

	const onChange = useCallback(
		(value) => {
			setValue(parse(value, name));
		},
		[name, parse, setValue]
	);

	return (
		<NumberInput
			// because it can affect other tickets that have this price
			// default price amount should not be changeable
			isDisabled={disabled}
			showStepper={false}
			onChange={onChange}
			placeholder={placeholder}
			value={fieldValue}
		/>
	);
};

export default BaseNumberInputField;
