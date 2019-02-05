/**
 * External imports
 */
import { Component } from 'react';
// import { EspressoIcon } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import {
	withFormHandler,
	twoColumnAdminFormLayout,
	// validations,
} from '@eventespresso/components';

/**
 * Internal dependencies
 */
// import { copyTicket, trashTicket } from '../action-handlers';
// import './style.css';

/**
 * TicketPriceCalculatorForm
 *
 * @constructor
 * @param {Object} ticket    JSON object defining the Ticket
 * @return {Object} rendered menu
 */
class TicketPriceCalculatorForm extends Component {
	render() {
		const {
			ticket,
			prices,
			submitButton,
			cancelButton,
			initialValues = {},
			currentValues = {},
		} = this.props;
		console.log( '' );
		console.log( 'TicketPriceCalculator.render()', this.props );
		// console.log( 'TicketPriceCalculator.render() ticket: ', ticket );
		// console.log( 'TicketPriceCalculator.render() prices: ', prices );
		// console.log( 'TicketPriceCalculator.render() initialValues', initialValues );
		// console.log( 'TicketPriceCalculator.render() currentValues', currentValues );
		const {
			FormInput,
			FormSection,
			FormWrapper,
			FormSaveCancelButtons,
			FormInfo,
		} = twoColumnAdminFormLayout;

		const prefix = 'ee-ticket-price-calculator';

		return ticket && ticket.id ? (
			<FormWrapper>
				<FormSection
					htmlId={ `${ prefix }-${ ticket.id }-form-section` }
				>
					<FormInput
						key="price"
						type="number"
						name={ `${ prefix }-price-${ ticket.id }` }
						initialValue={ initialValues[ `${ prefix }-price-${ ticket.id }` ] || null }
						label={ __( 'Ticket Price', 'event_espresso' ) }
						htmlId={ `${ prefix }-price-${ ticket.id }` }
						helpText={ __(
							'The amount of money charged for this ticket. Leave blank' +
							' to make this ticket selection free.',
							'event_espresso',
						) }
						inputWidth={ 3 }
						min={ 0 }
						step="0.01"
					/>
				</FormSection>
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
 * Enhanced TicketPriceCalculatorForm with FormHandler
 */
export default withFormHandler( TicketPriceCalculatorForm );

