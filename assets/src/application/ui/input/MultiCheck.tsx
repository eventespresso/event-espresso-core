import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox/Group';

const MultiCheck = ({ input: { value, ...rest }, options, ...restProps }) => {
	const props: CheckboxGroupProps = {
		...rest,
		...restProps,
		className: 'checkbox-group',
		options,
		value: value || [],
	};

	return <Checkbox.Group {...props} />;
};

export default MultiCheck;
