import React from 'react';

import { Form } from '../adapters';
import { FormRendererProps } from '../types';
import Submit from '../Submit';
import RenderFields from '../RenderFields';
import RenderSections from '../RenderSections';

const FormRenderer: React.FC<FormRendererProps> = (props) => {
	const {
		handleSubmit,
		submitting,
		sections = [],
		fields = [],
		submitButton,
		resetButton,
		layout,
		formWrapper: FormWrapper,
	} = props;

	const form = (
		<div className='form-wrapper'>
			<Form onSubmit={handleSubmit} layout={layout}>
				{sections.length ? <RenderSections sections={sections} /> : null}

				{fields.length ? <RenderFields fields={fields} /> : null}

				{/* May be formWrapper handles form submission */}
				{submitButton ? (
					<Submit submitting={submitting} submitButton={submitButton} resetButton={resetButton} />
				) : null}
			</Form>
		</div>
	);

	if (FormWrapper) {
		return <FormWrapper {...props}>{form}</FormWrapper>;
	}

	return form;
};
export default FormRenderer;
