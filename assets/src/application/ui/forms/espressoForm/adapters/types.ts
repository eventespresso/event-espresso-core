import { SelectProps as AntdSelectProps, SelectValue, OptionProps } from 'antd/lib/select';
import { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import { FieldRendererProps } from '../types';
import { FormItemProps as AntdFormItemProps } from 'antd/es/form';

export type ButtonProps = AntdButtonProps;

export interface SelectProps extends FieldRendererProps<SelectValue>, AntdSelectProps<SelectValue> {
	options: SelectOptions;
}

export interface SelectOptionProps extends OptionProps {
	optgroup?: string;
	options?: Array<OptionProps>;
}

export type SelectOptions = Array<SelectOptionProps>;

export type FormItemProps = AntdFormItemProps;
