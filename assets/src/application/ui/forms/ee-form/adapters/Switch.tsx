import React from 'react';
import { Switch } from 'antd';

const SwitchField = ({ input, ...rest }) => {
	return <Switch {...input} {...rest} checked={Boolean(input.value)} />;
};

export default SwitchField;
