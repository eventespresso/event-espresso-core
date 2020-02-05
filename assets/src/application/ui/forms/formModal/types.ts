import React from 'react';
import { FormProps, FormRenderProps } from 'react-final-form';
import { FormApi } from 'final-form';

export interface FormModalProps extends FormProps {
	FormComponent: React.FC;
	onClose: (e?: any) => void;
	isOpen: boolean;
}

export interface FormComponentProps {
	id?: string;
	title?: string;
	form?: FormApi;
	values?: any;
	submitting?: boolean;
	pristine?: boolean;
	formReset?: boolean;
}

export interface FormModalFormProps extends FormRenderProps {
	FormComponent: React.FC<FormComponentProps>;
	onClose: (e?: any) => void;
}
