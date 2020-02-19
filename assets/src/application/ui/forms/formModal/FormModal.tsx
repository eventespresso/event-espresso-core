import React from 'react';
import { Form as ReactFinalForm } from 'react-final-form';

import { FormModalProps } from './types';
import FormModalForm from './FormModalForm';
import FormRenderer from './FormRenderer';
import { EspressoForm } from '@application/ui/forms/espressoForm';

import './styles.css';

const FormModal: React.FC<FormModalProps> = ({
	FormComponent,
	formConfig,
	initialValues,
	onSubmit,
	isOpen,
	...extraProps
}) => {
	if (!isOpen) {
		return null;
	}

	// formConfig has the priority
	if (formConfig) {
		return <EspressoForm {...extraProps} {...formConfig} formWrapper={FormModalForm} />;
	}

	return (
		initialValues && (
			<ReactFinalForm
				initialValues={initialValues}
				onSubmit={onSubmit}
				{...extraProps}
				render={({ ...formProps }) => <FormRenderer {...formProps} FormComponent={FormComponent} />}
			/>
		)
	);
};

export default FormModal;
