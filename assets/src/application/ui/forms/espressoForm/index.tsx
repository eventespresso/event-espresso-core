import React from 'react';
import { Form as ReactFinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { EspressoFormProps } from './types';
import FormRenderer from './renderers/FormRenderer';
import { formConfig } from './config';
import './styles.css';

const EspressoForm: React.FC<EspressoFormProps> = ({ onSubmit, initialValues, validate, ...rest }) => {
	return (
		<div className='ee-form'>
			<ReactFinalForm
				initialValues={initialValues}
				onSubmit={onSubmit}
				validate={validate}
				render={FormRenderer}
				mutators={{ ...arrayMutators }}
				{...rest}
			/>
		</div>
	);
};

const TestForm = () => <EspressoForm {...formConfig} />;

export default TestForm;
