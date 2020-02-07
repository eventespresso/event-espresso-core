import React from 'react';
import { InputNumber } from 'antd';

const NumberField = ({ input, ...rest }) => {
	return <InputNumber {...input} {...rest} />;
};

export default NumberField;
