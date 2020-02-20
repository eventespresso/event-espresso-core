import React from 'react';
import { Checkbox } from 'antd';

const MultiCheck = ({ input: { value, ...rest }, options, ...restProps }) => {
	return <Checkbox.Group {...rest} {...restProps} options={options} value={value || []} className='checkbox-group' />;
};

export default MultiCheck;
