/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useCallback, useMemo } from '@wordpress/element';

/**
 * Internal imports
 */
import { FormContainer } from './form-container';
import { FormDataDebugDump } from './form-data-debug-dump';
import FormPlaceholder from './form-placeholder';
import FormSubmitButton from './form-submit-button';
import FormCancelButton from './form-cancel-button';

const nullFunc = () => null;

const FormHandlerForm = ( {
	FormComponent,
	form,
	initialValues,
	currentValues,
	handleSubmit,
	submitting,
	pristine,
	invalid,
	loading,
	loadingNotice,
	showSubmit,
	submitButtonText,
	showCancel,
	cancelButtonText,
	formChanges = false,
	resetHandler = nullFunc,
	...formProps
} ) => {
	pristine = pristine && ! formChanges;
	currentValues = isEmpty( currentValues ) ? initialValues : currentValues;
	const formReset = useCallback(
		( event ) => {
			if ( resetHandler !== nullFunc ) {
				resetHandler( event );
			}
			form.reset( event );
		},
		[ resetHandler, form.reset ]
	);
	const submitButton = useMemo(
		() => showSubmit ?
			<FormSubmitButton
				buttonText={ submitButtonText }
				submitting={ submitting }
				disabled={ pristine || invalid }
			/> :
			null,
		[ showSubmit, submitButtonText, submitting, pristine, invalid ]
	);
	const cancelButton = useMemo(
		() => showCancel ?
			<FormCancelButton
				buttonText={ cancelButtonText }
				onClick={ formReset }
				pristine={ pristine }
				submitting={ submitting }
			/> :
			null,
		[ showCancel, cancelButtonText, formReset, submitting, pristine ]
	);
	return (
		<form onSubmit={ handleSubmit }>
			<FormPlaceholder
				loading={ loading }
				notice={ loadingNotice }
			/>
			<FormContainer loading={ loading }>
				<FormComponent
					updateField={ form.change }
					touchField={ form.blur }
					initialValues={ initialValues }
					currentValues={ currentValues }
					submitButton={ submitButton }
					cancelButton={ cancelButton }
					formReset={ formReset }
					pristine={ pristine }
					{ ...formProps }
				/>
			</FormContainer>
			<FormDataDebugDump values={ currentValues } />
		</form>
	);
};

export default FormHandlerForm;
