import React from 'react';
import { Form as AntdForm } from 'antd';
import { FormProps } from 'antd/es/form';

const Form: React.FC<FormProps> = ({ children, layout }) => {
	return <AntdForm layout={layout}>{children}</AntdForm>;
};
export default Form;
