import React from 'react';

import { NumberInput } from '@infraUI/inputs';
import { FieldRendererProps } from '../forms/espressoForm';

const NumberField: React.FC<FieldRendererProps> = ({
	input: { onChange, value, ...input },
	meta: { error, submitError },
	...rest
}) => {
	return (
		<NumberInput
			inputFieldProps={input}
			isInvalid={error || submitError}
			onChange={onChange}
			value={value}
			{...rest}
		/>
	);
};

export default NumberField;
