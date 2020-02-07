import React from 'react';
import { Input } from 'antd';

const Text = ({ input, htmlType = 'text', ...rest }) => {
	return <Input {...input} {...rest} type={htmlType} />;
};

export default Text;
