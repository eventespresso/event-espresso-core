import React, { CSSProperties } from 'react';
import { pick } from 'ramda';

import { Form } from '../adapters';
import { FormRendererProps } from '../types';
import Submit from '../Submit';
import RenderFields from '../RenderFields';
import RenderSections from '../RenderSections';

const dataStyle: CSSProperties = {
	borderRadius: '5px',
	boxSizing: 'border-box',
	padding: '1em 2em',
	color: '#a9ce47',
	backgroundColor: '#26203d',
};

const FormRenderer: React.FC<FormRendererProps> = (props) => {
	const {
		submitting,
		sections = [],
		fields = [],
		submitButton,
		resetButton,
		layout,
		formWrapper: FormWrapper,
		debugFields,
		form,
	} = props;

	const formOutput = (
		<div className='ee-form'>
			<div className='form-wrapper'>
				<Form layout={layout}>
					{sections.length ? <RenderSections sections={sections} /> : null}

					{fields.length ? <RenderFields fields={fields} /> : null}

					{/* May be formWrapper handles form submission */}
					{submitButton ? (
						<Submit submitting={submitting} submitButton={submitButton} resetButton={resetButton} />
					) : null}
				</Form>

				{debugFields.length ? (
					<pre style={dataStyle}>{JSON.stringify(pick(debugFields, form.getState()), null, 2)}</pre>
				) : null}
			</div>
		</div>
	);

	if (FormWrapper) {
		return <FormWrapper {...props}>{formOutput}</FormWrapper>;
	}

	return formOutput;
};
export default FormRenderer;
