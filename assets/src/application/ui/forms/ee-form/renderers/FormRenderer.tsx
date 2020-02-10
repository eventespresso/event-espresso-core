import React from 'react';

import { Form } from '../adapters';
import { FormRendererProps } from '../types';
import Submit from '../Submit';
import RenderFields from '../RenderFields';
import RenderSections from '../RenderSections';

const FormRenderer: React.FC<FormRendererProps> = ({
	handleSubmit,
	submitting,
	sections,
	fields,
	submitButton,
	resetButton,
}) => {
	return (
		<div className='form-wrapper'>
			<Form onSubmit={handleSubmit}>
				<RenderSections sections={sections} />
				<RenderFields fields={fields} />
				<Submit submitting={submitting} submitButton={submitButton} resetButton={resetButton} />
			</Form>
		</div>
	);
};
export default FormRenderer;
