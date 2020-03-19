import React from 'react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

const NumberField: React.FC<InputNumberProps> = (props) => {
	return <InputNumber {...props} />;
};

export default NumberField;
