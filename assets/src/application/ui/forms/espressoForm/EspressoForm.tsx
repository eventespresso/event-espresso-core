import React from 'react';
import { Form as ReactFinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { EspressoFormProps } from './types';
import FormRenderer from './renderers/FormRenderer';
import { FormProvider } from './context';
import { updateFieldValue } from './utils';
import './styles.scss';

const EspressoForm: React.FC<EspressoFormProps> = ({ onSubmit, mutators, layout, ...rest }) => {
	const context = { layout };
	const formMutators = {
		...arrayMutators,
		...mutators,
		updateFieldValue,
	};

	return (
		<FormProvider value={context}>
			<ReactFinalForm component={FormRenderer} onSubmit={onSubmit} mutators={formMutators} {...rest} />
		</FormProvider>
	);
};

export default EspressoForm;
