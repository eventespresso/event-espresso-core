/**
 * External imports
 */
import { Component } from 'react';
import { Form } from 'react-final-form';

/**
 * Internal imports
 */
import { FormContainer } from './form-container';
import { FormDataDebugDump } from './form-data-debug-dump';
import { FormErrorBoundary } from './form-error-boundary';
import { FormPlaceholder } from './form-placeholder';
import { FormSubmitButton } from './form-submit-button';
import { FormResetButton } from './form-reset-button';

/**
 * withFormHandler
 * Higher-Order-Component that wraps the supplied form component
 * with a React-Final-Form Form component and connects it to the
 * supplied load and submit handlers
 *
 * @param {Function} FormComponent
 * @param {Function} loadHandler a function that supplies the form data
 * @param {Function} submitHandler a function that processes the submitted form
 * @return {Object} FormComponent with added form handling
 */
export const withFormHandler = (
	FormComponent,
	loadHandler,
	submitHandler
) => {
	/**
	 * FormHandler
	 *
	 * @param {Function} form component
	 * @param {Function} loadHandler a function that supplies the form data
	 * @param {Function} submitHandler a function that processes the submitted form
	 * @param {string} errorMessage custom message displayed when things go bad
	 */
	class FormHandler extends Component {
		/**
		 * @constructor
		 * @param {Object} props
		 */
		constructor( props ) {
			super( props );
			this.state = {
				loading: false,
				data: {},
			};
		}

		/**
		 * @function
		 */
		async componentDidMount() {
			this.setState( { loading: true } );
			const data = await loadHandler();
			this.setState( { loading: false, data } );
		}

		render() {
			const { data, loading, errorMessage = '' } = this.state;
			return (
				<FormErrorBoundary errorMessage={ errorMessage } >
					<Form
						onSubmit={ submitHandler }
						initialValues={ data }
						render={ ( {
							handleSubmit,
							form,
							submitting,
							pristine,
							values,
						} ) => {
							const submitButton = (
								<FormSubmitButton
									submitting={ submitting }
								/>
							);
							const resetButton = (
								<FormResetButton
									onClick={ form.reset }
									pristine={ pristine }
									submitting={ submitting }
								/>
							);
							return (
								<form onSubmit={ handleSubmit }>
									<FormPlaceholder loading={ loading } />
									<FormContainer loading={ loading } >
										<FormComponent
											submitButton={ submitButton }
											resetButton={ resetButton }
											initialValues={ data }
											currentValues={ values }
										/>
									</FormContainer>
									<FormDataDebugDump values={ values } />
								</form>
							);
						} }
					/>
				</FormErrorBoundary>
			);
		}
	}
	return FormHandler;
};
