import React from 'react';
import { InputNumber } from 'antd';

const NumberField = ({ input, ...rest }) => {
	return <InputNumber {...input} {...rest} onPressEnter={(e) => e.preventDefault()} />;
};

export default NumberField;
