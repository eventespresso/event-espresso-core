import React from 'react';
import { Form as AntdForm } from 'antd';
import { FormProps } from 'antd/es/form';

const Form: React.FC<FormProps> = ({ children, onSubmit, layout }) => {
	return (
		<AntdForm layout={layout} onSubmit={onSubmit}>
			{children}
		</AntdForm>
	);
};
export default Form;
