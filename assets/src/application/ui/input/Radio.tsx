import React from 'react';
import { Radio } from 'antd';

const RadioField = ({ input: { value, ...input }, options, ...radioProps }) => {
	return (
		<Radio.Group {...input} {...radioProps}>
			{options.map(({ value: optValue, label }, i) => {
				return (
					<Radio key={optValue + i} value={optValue} checked={value === optValue}>
						{label}
					</Radio>
				);
			})}
		</Radio.Group>
	);
};

export default RadioField;
