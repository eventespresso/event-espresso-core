/**
 * External imports
 */
import { isEmpty, isFunction } from 'lodash';
import { Component } from '@wordpress/element';
import { Form } from 'react-final-form';

/**
 * Internal imports
 */
import { FormContainer } from './form-container';
import { FormDataDebugDump } from './form-data-debug-dump';
import { FormErrorBoundary } from './form-error-boundary';
import { FormPlaceholder } from './form-placeholder';
import { FormSubmitButton } from './form-submit-button';
import { FormCancelButton } from './form-cancel-button';

/**
 * withFormHandler
 * Higher-Order-Component that wraps the supplied form component
 * with a React-Final-Form Form component and connects it to the
 * supplied load, Submit, and Reset handlers, which can either
 * be passed directly to this HOC as function parameters,
 * or passed as props to the final wrapped component.
 * Passing as props allows more interactivity from the calling component.
 *
 * @param {Function} FormComponent
 * @param {Function} loadHandler a function that supplies the form data
 * @param {Function} submitHandler a function that processes the submitted form
 * @param {Function} resetHandler a function called when resetting the form
 * @return {Object} FormComponent with added form handling
 */
export const withFormHandler = (
	FormComponent,
	loadHandler = null,
	submitHandler = null,
	resetHandler = null
) => {
	/**
	 * FormHandler
	 *
	 * @param {Function} form component
	 * @param {Function} loadHandler callback that supplies the form data
	 * @param {Function} submitHandler callback that processes the form
	 * @param {Function} resetHandler callback for resetting the form
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
				changes: false,
				data: {},
				loadHandler: props.loadHandler ?
					props.loadHandler :
					loadHandler,
				submitHandler: props.submitHandler ?
					props.submitHandler :
					submitHandler,
				resetHandler: props.resetHandler ?
					props.resetHandler :
					resetHandler,
			};
		}

		/**
		 * @function
		 */
		markChanges = () => {
			this.setState( { changes: true } );
		};

		/**
		 * @function
		 */
		reset = () => {
			this.setState( { changes: false } );
		};

		/**
		 * @function
		 */
		async componentDidMount() {
			if ( isFunction( this.state.loadHandler ) ) {
				this.setState( { loading: true } );
				const data = await this.state.loadHandler();
				this.setState( { loading: false, data } );
			}
		}

		render() {
			const {
				loading,
				errorMessage = '',
				loadingNotice = '',
				...formProps
			} = this.props;
			let { formData = null } = this.props;
			formData = formData === null && ! isEmpty( this.state.data ) ?
				this.state.data :
				formData;
			return (
				<FormErrorBoundary errorMessage={ errorMessage } >
					<Form
						onSubmit={ this.state.submitHandler }
						initialValues={ formData }
						render={ ( {
							form,
							values,
							handleSubmit,
							submitting,
							pristine,
							invalid,
						} ) => {
							pristine = pristine && ! this.state.changes;
							const submitButton = (
								<FormSubmitButton
									submitting={ submitting }
									disabled={ pristine || invalid }
								/>
							);
							const formReset = ( event ) => {
								this.reset();
								this.state.resetHandler( event );
								form.reset( event );
							};
							const cancelButton = (
								<FormCancelButton
									onClick={ formReset }
									pristine={ pristine }
									submitting={ submitting }
								/>
							);
							return (
								<form onSubmit={ handleSubmit }>
									<FormPlaceholder
										loading={ loading }
										notice={ loadingNotice }
									/>
									<FormContainer loading={ loading } >
										<FormComponent
											initialValues={ formData }
											currentValues={ values }
											submitButton={ submitButton }
											cancelButton={ cancelButton }
											formReset={ formReset }
											markChanges={ this.markChanges }
											pristine={ pristine }
											{ ...formProps }
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
