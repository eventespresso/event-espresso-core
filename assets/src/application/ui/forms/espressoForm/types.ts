import React from 'react';
import { FormRenderProps, FormProps, FieldRenderProps, FieldProps as RFFFieldProps } from 'react-final-form';
import { FieldArrayProps } from 'react-final-form-arrays';

import { SelectOptions, ButtonProps } from './adapters/types';

interface FormButtonProps extends ButtonProps {
	label?: string;
}

interface AdditionalFormProps {
	sections?: SectionList;
	fields?: FieldList;
	submitButton?: FormButtonProps;
	resetButton?: FormButtonProps;
}

export interface AdditionalFieldProps {
	label?: React.ReactNode | string;
	fieldType: 'text' | 'textarea' | 'switch' | 'select' | 'multicheck' | 'number' | 'radio' | 'group';
	htmlType?: string;
	before?: React.ReactNode | string;
	after?: React.ReactNode | string;
	desc?: React.ReactNode | string;
	subFields?: FieldList;
	options?: SelectOptions;
	isRepeatable?: boolean;
	conditions?: FieldConditions;
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

export interface EspressoFormProps extends FormProps, AdditionalFormProps {}

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
	title?: string;
	fields: FieldList;
	/**
	 * If true, each field inside the section
	 * will be saved as `${section.name}.{field.name}`
	 */
	namespaceFields?: boolean;
}

type FieldList = Array<FieldProps>;
type SectionList = Array<SectionProps>;
