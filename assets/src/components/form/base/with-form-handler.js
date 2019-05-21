/**
 * External imports
 */
import { castArray, isEmpty, isFunction } from 'lodash';
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
 * supplied load, Submit, and Reset handlers, which are
 * passed as props to the final wrapped component.
 *
 * @param {Function} FormComponent
 * @return {Object} FormComponent with added form handling
 */
export const withFormHandler = ( FormComponent ) => {
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
			if ( isFunction( this.props.loadHandler ) ) {
				this.setState( { loading: true } );
				const data = await this.props.loadHandler();
				this.setState( { loading: false, data } );
			}
		}

		render() {
			const {
				loading,
				resetHandler,
				errorMessage = '',
				loadingNotice = '',
				decorators = [],
				mutators = {},
				formChanges = false,
				setMutatorCallbacks = () => null,
				...formProps
			} = this.props;
			let { formData = null } = this.props;
			formData = formData === null && ! isEmpty( this.state.data ) ?
				this.state.data :
				formData;
			const showSubmit = typeof this.props.submitHandler === 'function';
			const submitHandler = this.props.submitHandler || ( () => null );
			return (
				<FormErrorBoundary errorMessage={ errorMessage } >
					<Form
						onSubmit={ submitHandler }
						initialValues={ formData || {} }
						decorators={ castArray( decorators ) }
						mutators={ mutators }
						render={ ( {
							form,
							values,
							handleSubmit,
							submitting,
							pristine,
							invalid,
						} ) => {
							setMutatorCallbacks( form.mutators );
							pristine = pristine && ! this.state.changes;
							const submitButton = showSubmit ?
								<FormSubmitButton
									submitting={ submitting }
									disabled={
										( pristine || invalid ) && ! formChanges
									}
								/> :
								null;
							const formReset = ( event ) => {
								this.reset();
								resetHandler( event );
								form.reset( event );
							};
							const cancelButton = resetHandler ?
								<FormCancelButton
									onClick={ formReset }
									pristine={ pristine }
									submitting={ submitting }
								/> :
								null;
							return (
								<form onSubmit={ handleSubmit }>
									<FormPlaceholder
										loading={ loading }
										notice={ loadingNotice }
									/>
									<FormContainer loading={ loading } >
										<FormComponent
											initialValues={ formData || {} }
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
