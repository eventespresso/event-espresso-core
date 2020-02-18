import React from 'react';
import { Form as ReactFinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { EspressoFormProps } from './types';
import FormRenderer from './renderers/FormRenderer';
import { FormProvider } from './context';
import './styles.scss';

const EspressoForm: React.FC<EspressoFormProps> = ({ onSubmit, mutators, layout, ...rest }) => {
	const context = { layout };
	return (
		<div className='ee-form'>
			<FormProvider value={context}>
				<ReactFinalForm
					onSubmit={onSubmit}
					render={FormRenderer}
					mutators={{
						...arrayMutators,
						...mutators,
					}}
					{...rest}
				/>
			</FormProvider>
		</div>
	);
};

export default EspressoForm;
