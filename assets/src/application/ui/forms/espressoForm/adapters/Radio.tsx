import React from 'react';

import { Radio, RadioGroup } from '@infraUI/inputs';
import { FieldRendererProps } from '../types';

const RadioField: React.FC<FieldRendererProps> = ({ input, meta, options, ...restProps }) => {
	const children = options.map(({ label, value, ...rest }, index) => {
		return (
			<Radio value={value} {...rest} key={`${value}${index}`}>
				{label}
			</Radio>
		);
	});

	return (
		<RadioGroup {...input} {...restProps}>
			{children}
		</RadioGroup>
	);
};

export default RadioField;
