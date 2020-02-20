import { SelectProps as AntdSelectProps, SelectValue } from 'antd/lib/select';
import { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import { FieldRendererProps } from '../forms/espressoForm/types';

export type ButtonProps = AntdButtonProps;

export interface SelectProps extends Pick<FieldRendererProps, 'input'>, Pick<AntdSelectProps<SelectValue>, 'mode'> {
	options: SelectOptions;
}

export interface OptionProps {
	label?: string;
	value?: string;
}

export interface SelectOptionProps extends OptionProps {
	optgroup?: string;
	options?: Array<OptionProps>;
}

export type SelectOptions = Array<SelectOptionProps>;
