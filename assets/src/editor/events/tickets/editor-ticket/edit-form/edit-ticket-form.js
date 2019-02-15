/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { Component } from '@wordpress/element';
// import { __ } from '@eventespresso/i18n';
import {
	withFormHandler,
	twoColumnAdminFormLayout,
	// validations,
} from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { ticketEntityFormInputs } from '../';

/**
 * @function
 * @param {Object} ticket    JSON object defining the Event Date
 */
class EditTicketForm extends Component {
	render() {
		const {
			ticket,
			submitButton,
			cancelButton,
			currentValues = {},
			initialValues = {},
			newObject = false,
		} = this.props;
		// edit forms for existing objects must have initial values
		if (
			( ! newObject && isEmpty( initialValues ) ) ||
			isEmpty( currentValues )
		) {
			return null;
		}
		// console.log( '' );
		// console.log( 'EditTicketForm.render()', this.props );
		// console.log( 'EditTicketForm.render() initialValues', initialValues );
		// console.log( 'EditTicketForm.render() currentValues', currentValues );
		const {
			FormInput,
			FormSection,
			FormWrapper,
			FormSaveCancelButtons,
			FormInfo,
		} = twoColumnAdminFormLayout;

		// entity properties we don't want to be editable
		const exclude = [
			'TKT_ID',
			'sold',
			'reserved',
			'order',
			'parent',
			'deleted',
			'wpUser',
			'status',
		];
		const formRows = ticketEntityFormInputs(
			ticket,
			exclude,
			currentValues,
			FormInput
		);
		formRows.unshift(
			<FormInfo
				key="formInfo"
				formInfo={
					__(
						'all fields marked with an asterisk are required',
						'event_espresso'
					)
				}
				dismissable={ false }
			/>
		);

		return ticket && ticket.id ? (
			<FormWrapper>
				<FormSection
					htmlId={ `ee-ticket-editor-${ ticket.id }-form-section` }
					children={ formRows }
				/>
				<FormSaveCancelButtons
					htmlClass={ `ee-ticket-editor-${ ticket.id }` }
					submitButton={ submitButton }
					cancelButton={ cancelButton }
				/>
			</FormWrapper>
		) : null;
	}
}

/**
 * Enhanced EditTicketForm with FormHandler
 */
export default withFormHandler( EditTicketForm );
