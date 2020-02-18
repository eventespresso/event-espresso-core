import React, { CSSProperties } from 'react';

import { FormModalFormProps } from './types';
import FormModalForm from './FormModalForm';

const formStyle: CSSProperties = {
	boxSizing: 'border-box',
	padding: '1em 2em',
};

const dataStyle: CSSProperties = {
	borderRadius: '5px',
	boxSizing: 'border-box',
	padding: '1em 2em',
	color: '#a9ce47',
	backgroundColor: '#26203d',
};

const FormRenderer: React.FC<FormModalFormProps> = (props) => {
	const { FormComponent, form, values, handleSubmit, submitting, pristine, ...formProps } = props;

	return (
		<FormModalForm {...props}>
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
				<pre style={dataStyle}>{JSON.stringify(values, null, 2)}</pre>
			</form>
		</FormModalForm>
	);
};
export default FormRenderer;
