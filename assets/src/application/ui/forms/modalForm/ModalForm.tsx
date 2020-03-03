import React from 'react';
import { Form as ReactFinalForm } from 'react-final-form';

import { ModalFormProps } from './types';
import RenderModalForm from './RenderModalForm';
import FormRenderer from './FormRenderer';
import { EspressoForm } from '@application/ui/forms/espressoForm';

import './styles.scss';

const ModalForm: React.FC<ModalFormProps> = ({
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
		return <EspressoForm {...extraProps} {...formConfig} formWrapper={RenderModalForm} />;
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

export default ModalForm;
