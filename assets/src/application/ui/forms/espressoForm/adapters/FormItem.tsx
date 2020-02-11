import React from 'react';
import { __ } from '@wordpress/i18n';
import { Form as AntdForm } from 'antd';
import { FormItemProps } from 'antd/es/form';

const { Item: AntdFormItem } = AntdForm;

const FormItem: React.FC<FormItemProps> = ({ children, ...rest }) => {
	return <AntdFormItem {...rest}>{children}</AntdFormItem>;
};
export default FormItem;
