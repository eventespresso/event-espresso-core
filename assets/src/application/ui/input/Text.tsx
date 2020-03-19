import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

const Text: React.FC<InputProps> = ({ type = 'text', ...props }) => {
	return <Input {...props} onPressEnter={(e) => e.preventDefault()} type={type} />;
};

export default Text;
