import React from 'react';
import { __ } from '@wordpress/i18n';

import { Form } from './adapters';
import { FormRendererProps } from './types';
import Submit from './Submit';
import RenderFields from './RenderFields';

const FormRenderer: React.FC<FormRendererProps> = ({ handleSubmit, submitting, sections, fields, submitLabel }) => {
	return (
		<Form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
			<RenderFields fields={fields} />
			<Submit submitting={submitting} label={submitLabel} />
		</Form>
	);
};
export default FormRenderer;
