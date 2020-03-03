import React from 'react';
import { FormProps, FormRenderProps } from 'react-final-form';
import { FormApi } from 'final-form';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';

export interface ModalFormProps extends FormProps {
	FormComponent?: React.NamedExoticComponent;
	formConfig?: EspressoFormProps;
	onClose: (e?: any) => void;
	isOpen: boolean;
}

export interface FormComponentProps {
	id?: string;
	title?: string | React.ReactNode;
	form?: FormApi;
	values?: any;
	submitting?: boolean;
	pristine?: boolean;
	formReset?: boolean;
}

export interface RenderModalFormProps extends FormRenderProps {
	title?: string | React.ReactNode;
	FormComponent?: React.NamedExoticComponent<FormComponentProps>;
	onClose?: (e?: any) => void;
}
