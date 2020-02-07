import { SelectProps as AntdSelectProps, SelectValue, OptGroupProps, OptionProps } from 'antd/lib/select';
import { FieldRendererProps } from '../types';

export interface SelectProps extends FieldRendererProps<SelectValue>, AntdSelectProps<SelectValue> {
	options: SelectOptions;
}

export interface SelectOptionProps extends OptionProps {
	optgroup?: string;
	options: Array<OptionProps>;
}

export type SelectOptions = Array<SelectOptionProps>;
