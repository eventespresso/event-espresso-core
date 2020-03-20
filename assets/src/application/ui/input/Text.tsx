import React from 'react';
import { Input } from 'antd';

const Text = ({ htmlType = 'text', input, ...props }) => {
	return <Input {...input} {...props} onPressEnter={(e) => e.preventDefault()} type={htmlType} />;
};

export default Text;
