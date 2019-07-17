/**
 * External imports
 */
import { castArray, isEqual } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Form } from 'react-final-form';

/**
 * Internal imports
 */
import { FormErrorBoundary } from './form-error-boundary';
import FormHandlerForm from './form-handler-form';

const nullFunc = () => null;

/**
 * withFormHandler
 * Higher-Order-Component that wraps the supplied form component
 * with a React-Final-Form Form component and connects it to the
 * supplied load, Submit, and Reset handlers, which are
 * passed as props to the final wrapped component.
 *
 * @param {Function} FormComponent
 * @return {Object} FormComponent with added form handling
 */
const withFormHandler = createHigherOrderComponent(
	( FormComponent ) => ( {
		loadHandler = nullFunc,
		submitHandler = nullFunc,
		setMutatorCallbacks = nullFunc,
		submitButtonText = '',
		cancelButtonText = '',
		errorMessage = '',
		loadingNotice = '',
		decorators = [],
		mutators = {},
		...otherProps
	} ) => (
		<FormErrorBoundary errorMessage={ errorMessage } >
			<Form
				{ ...otherProps }
				onSubmit={ submitHandler }
				initialValues={ loadHandler() || {} }
				decorators={ castArray( decorators ) }
				mutators={ mutators }
				render={ ( {
					form,
					values,
					initialValues,
					...formProps
				} ) => {
					setMutatorCallbacks( form.mutators );
					return (
						<FormHandlerForm
							{ ...formProps }
							FormComponent={ FormComponent }
							form={ form }
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
	),
	'withFormHandler'
);

export default withFormHandler;
