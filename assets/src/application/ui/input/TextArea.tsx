import React from 'react';
import { Input } from 'antd';

const TextArea = ({ input, ...rest }) => {
	return <Input.TextArea {...input} {...rest} />;
};

export default TextArea;
