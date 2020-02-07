import React from 'react';
import { Form as ReactFinalForm } from 'react-final-form';

import { EspressoFormProps } from './types';
import FormRenderer from './FormRenderer';
import { formConfig } from './config';

const EspressoForm: React.FC<EspressoFormProps> = ({ onSubmit, initialValues, validate, ...rest }) => {
	return (
		<ReactFinalForm
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={validate}
			render={FormRenderer}
			{...rest}
		/>
	);
};

const TestForm = () => <EspressoForm {...formConfig} />;

export default TestForm;
