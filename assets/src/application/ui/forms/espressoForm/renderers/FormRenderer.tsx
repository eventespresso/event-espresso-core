import React from 'react';
import { pick } from 'ramda';

import { FormRendererProps } from '../types';
import Submit from '../Submit';
import RenderFields from '../RenderFields';
import RenderSections from '../RenderSections';
import { DebugInfo } from '../../../display';

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
		hasValidationErrors,
		hasSubmitErrors,
		form,
	} = props;

	const formOutput = (
		<div className='ee-form'>
			<div className='form-wrapper'>
				<form>
					{sections.length ? <RenderSections sections={sections} /> : null}

					{fields.length ? <RenderFields fields={fields} /> : null}

					{/* May be formWrapper handles form submission */}
					{submitButton ? (
						<Submit
							hasErrors={hasValidationErrors || hasSubmitErrors}
							submitting={submitting}
							submitButton={submitButton}
							resetButton={resetButton}
						/>
					) : null}
				</form>
				{debugFields.length ? <DebugInfo data={pick(debugFields, form.getState())} /> : null}
			</div>
		</div>
	);

	if (FormWrapper) {
		return <FormWrapper {...props}>{formOutput}</FormWrapper>;
	}

	return formOutput;
};
export default FormRenderer;
