/**
 * External imports
 */
import { Form } from 'react-final-form';
import { castArray, isEqual } from 'lodash';

/**
 * Internal imports
 */
import { FormErrorBoundary } from './form-error-boundary';
import FormHandlerForm from './form-handler-form';

const nullFunc = () => null;

/**
 * FormHandler
 * Higher-Order-Component that wraps the supplied form component
 * with a React-Final-Form Form component and connects it to the
 * supplied load, Submit, and Reset handlers, which are
 * passed as props to the final wrapped component.
 *
 * @param {Function} FormComponent
 * @return {Object} FormComponent with added form handling
 */
const FormHandler = ( {
	formData,
	loadHandler = nullFunc,
	submitHandler = nullFunc,
	setMutatorCallbacks = nullFunc,
	submitButtonText = '',
	cancelButtonText = '',
	errorMessage = '',
	loadingNotice = '',
	decorators = [],
	mutators = {},
	displayForm = true,
	setPreventModalClose = nullFunc,
	...otherProps
} ) => {
	return displayForm ? (
		<FormErrorBoundary errorMessage={ errorMessage } >
			<Form
				{ ...otherProps }
				onSubmit={ submitHandler || nullFunc }
				initialValues={ formData || loadHandler() }
				decorators={ castArray( decorators ) }
				mutators={ mutators }
				render={ ( {
					form,
					values,
					invalid,
					initialValues,
					...formProps
				} ) => {
					setPreventModalClose( invalid );
					setMutatorCallbacks( form.mutators );
					return (
						<FormHandlerForm
							{ ...formProps }
							form={ form }
							invalid={ invalid }
							initialValues={ initialValues }
							currentValues={ values }
							notice={ loadingNotice }
							showSubmit={ submitHandler !== nullFunc }
							submitButtonText={ submitButtonText }
							cancelButtonText={ cancelButtonText }
							pristine={ isEqual( values, initialValues ) }
						/>
					);
				} }
			/>
		</FormErrorBoundary>
	) : null;
};

export default FormHandler;
