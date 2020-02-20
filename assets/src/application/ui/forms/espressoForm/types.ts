import React, { CSSProperties } from 'react';
import { FormRenderProps, FormProps, FieldRenderProps, FieldProps as RFFFieldProps } from 'react-final-form';
import { FieldArrayProps } from 'react-final-form-arrays';
import { FormState, AnyObject } from 'final-form';
import { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import { FormItemProps as AntdFormItemProps } from 'antd/es/form';

export type ButtonProps = AntdButtonProps;

export interface FormButtonProps extends ButtonProps {
	label?: string;
}

export interface FormContextProps {
	layout?: 'horizontal' | 'vertical' | 'inline';
}

interface AdditionalFormProps extends FormContextProps {
	sections?: SectionList;
	fields?: FieldList;
	submitButton?: FormButtonProps;
	resetButton?: FormButtonProps;
	formWrapper?: React.ReactType;
	debugFields?: Array<keyof FormState<any>>; // The fields from RFF form state to display in debug
}

export type FormItemProps = Omit<AntdFormItemProps, 'children'>;

export interface OptionProps {
	label?: string;
	value?: string;
}

export interface SelectOptionProps extends OptionProps {
	optgroup?: string;
	options?: Array<OptionProps>;
}

export type SelectOptions = Array<SelectOptionProps>;

export interface AdditionalFieldProps {
	label?: React.ReactNode | string;
	fieldType:
		| 'text'
		| 'textarea'
		| 'switch'
		| 'select'
		| 'multicheck'
		| 'number'
		| 'radio'
		| 'group'
		| 'datepicker'
		| 'timepicker';
	htmlType?: string;
	before?: React.ReactNode | string;
	after?: React.ReactNode | string;
	desc?: React.ReactNode | string;
	subFields?: FieldList;
	options?: SelectOptions;
	isRepeatable?: boolean;
	conditions?: FieldConditions;
	formItemProps?: FormItemProps;
	[key: string]: any;
}

export interface FieldCondition {
	field: string;
	compare:
		| '='
		| '!='
		| '!='
		| '>'
		| '>='
		| '<'
		| '<='
		| 'EMPTY'
		| 'NOT_EMPTY'
		| 'CONTAINS'
		| 'NOT_CONTAINS'
		| 'MATCHES'
		| 'NOT_MATCHES';
	value?: string;
}

export type FieldConditions = Array<FieldCondition>;

export interface EspressoFormProps<FormValues = AnyObject> extends FormProps<FormValues>, AdditionalFormProps {}

export interface FormRendererProps extends FormRenderProps, AdditionalFormProps {}

export interface FieldRendererProps<FieldValue = any> extends FieldRenderProps<FieldValue>, FieldProps<FieldValue> {}

export interface RepeatableRendererProps<FieldValue = any>
	extends FieldArrayProps<FieldValue, any>,
		AdditionalFieldProps {}

export interface FieldProps<FieldValue = any>
	extends AdditionalFieldProps,
		RFFFieldProps<FieldValue, FieldRendererProps> {}

export type FormValuesShape = {
	[key: string]: any;
};

export interface SubmitProps extends Pick<AdditionalFormProps, 'submitButton' | 'resetButton'> {
	submitting: boolean;
}

export interface RenderFieldsProps {
	fields: FieldList;
	namespace?: string;
}

export interface RenderSectionsProps {
	sections: SectionList;
}

export interface RenderFieldProps extends FieldProps {}

export interface SectionProps {
	name: string;
	title?: string | React.ReactNode;
	icon?: React.ComponentType<{ className: string }>;
	fields: FieldList;
	/**
	 * If true, each field inside the section
	 * will be saved as `${section.name}.{field.name}`
	 */
	addSectionToFieldNames?: boolean;
}

type FieldList = Array<FieldProps>;
type SectionList = Array<SectionProps>;
