import React from 'react';

import { Checkbox, CheckboxGroup } from '@infraUI/inputs';
import { FieldRendererProps } from '../types';

const MultiCheck: React.FC<FieldRendererProps> = ({ input, meta, options, ...restProps }) => {
	const children = options.map(({ label, value, ...rest }, index) => {
		return (
			<Checkbox value={value} {...rest} key={`${value}${index}`}>
				{label}
			</Checkbox>
		);
	});

	const value = input.value || [];

	return (
		<CheckboxGroup {...input} {...restProps} value={value}>
			{children}
		</CheckboxGroup>
	);
};

export default MultiCheck;
