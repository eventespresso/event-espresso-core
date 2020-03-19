import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input/TextArea';

const TextArea: React.FC<TextAreaProps> = (props) => {
	return <Input.TextArea {...props} onPressEnter={(e) => e.preventDefault()} />;
};

export default TextArea;
