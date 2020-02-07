import { FormRenderProps, FormProps, FieldRenderProps } from 'react-final-form';
import { SelectOptions } from './adapters/types';

type FieldList = Array<FieldProps>;
type SectionList = Array<any>;

interface AdditionalFormProps {
	sections?: SectionList;
	fields?: FieldList;
	submitLabel?: string;
}

export interface EspressoFormProps extends FormProps, AdditionalFormProps {}

export interface FormRendererProps extends FormRenderProps, AdditionalFormProps {}

export interface FieldRendererProps<FieldValue = any> extends FieldRenderProps<FieldValue>, FieldProps<FieldValue> {}

export interface FieldProps<FieldValue = any> {
	id?: string;
	label?: HTMLElement | string;
	fieldType: 'text' | 'textarea' | 'switch' | 'select' | 'multicheck' | 'number';
	htmlType?: string;
	before?: HTMLElement | string;
	after?: HTMLElement | string;
	desc?: HTMLElement | string;
	subFields?: Array<FieldProps>;
	defaultValue?: FieldValue;
	options?: SelectOptions;
	repeatable?: boolean;
	[key: string]: any;
}

export type FormValuesShape = {
	[key: string]: any;
};

export interface SubmitProps {
	submitting: boolean;
	label?: string;
	[key: string]: any;
}

export interface RenderFieldsProps {
	fields: FieldList;
}

export interface RenderFieldProps extends FieldProps {}
