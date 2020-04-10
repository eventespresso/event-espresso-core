import React, { CSSProperties } from 'react';

import { RenderModalFormProps } from './types';
import RenderModalForm from './RenderModalForm';
import { DebugInfo } from '@appDisplay/index';

const formStyle: CSSProperties = {
	boxSizing: 'border-box',
	padding: '1em 2em',
};

const FormRenderer: React.FC<RenderModalFormProps> = (props) => {
	const { FormComponent, form, values, handleSubmit, submitting, pristine, ...formProps } = props;

	return (
		<RenderModalForm {...props}>
			<form onSubmit={handleSubmit}>
				<div style={formStyle}>
					<FormComponent
						form={form}
						values={values}
						submitting={submitting}
						pristine={pristine}
						{...formProps}
					/>
				</div>
				<DebugInfo data={values} />
			</form>
		</RenderModalForm>
	);
};
export default FormRenderer;
