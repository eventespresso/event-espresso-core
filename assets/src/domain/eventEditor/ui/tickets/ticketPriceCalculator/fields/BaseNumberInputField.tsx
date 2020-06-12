import React from 'react';

import { BaseFieldProps } from './types';
import { TextInput } from '@infraUI/inputs';
import useBaseField from './useBaseField';

const BaseNumberInputField: React.FC<BaseFieldProps> = ({
	component,
	format,
	formatOnBlur,
	className,
	disabled,
	name,
	parse,
	placeholder,
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

	return (
		<TextInput
			className={className}
			// because it can affect other tickets that have this price
			// default price amount should not be changeable
			isDisabled={disabled}
			placeholder={placeholder}
			{...props}
			{...handlers}
			size={null} // TS doesn't like this prop to go
			value={fieldValue as string}
			type="number"
		/>
	);
};

export default BaseNumberInputField;
