import React from 'react';

import { Select } from '@infraUI/inputs';
import { FieldRendererProps } from '../types';

const SelectField: React.FC<FieldRendererProps> = ({
	input,
	meta: { error, submitError },
	multiple,
	...selectProps
}) => {
	// make sure the value is an array when mode is "multiple"
	const value = multiple ? input.value || [] : input.value;

	return <Select {...input} value={value} isInvalid={error || submitError} {...selectProps} />;
};

export default SelectField;
