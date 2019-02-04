/**
 * External imports
 */
import { indexOf } from 'lodash';
import { __ } from '@eventespresso/i18n';
import { validations } from '@eventespresso/components';

/**
 * ticketEntityFormInputs
 * returns an array of inputs corresponding to
 * the properties of the Ticket Entity
 *
 * @function
 * @param {Object} ticket  EE Ticket object
 * @param {Array} exclude  Array of field names to not display inputs for
 * @param {Array} currentValues  Array of input values
 * @param {Object} FormInput Input object to use
 * @return {Object} rendered form
 */
export const ticketEntityFormInputs = (
	ticket,
	exclude = [],
	currentValues = [],
	FormInput,
) => {
	if ( ! ticket || ( ticket && ! ticket.id ) ) {
		return null;
	}
	// console.log( '' );
	// console.log( 'ticketEntityFormInputs ticket', ticket );
	// console.log( 'ticketEntityFormInputs currentValues', currentValues );
	// console.log( 'ticketEntityFormInputs exclude', exclude );
	const values = currentValues;
	const prefix = 'ee-ticket';
	const ticketId = ticket.id;
	const inputs = [];
	if ( indexOf( exclude, 'TKT_ID' ) < 0 ) {
		inputs.push(
			<FormInput
				key="id"
				type="number"
				name={ `${ prefix }-id-${ ticketId }` }
				initialValue={ values[ `${ prefix }-id-${ ticketId }` ] }
				label={ __( 'Ticket ID', 'event_espresso' ) }
				htmlId={ `${ prefix }-id-${ ticketId }` }
				// validators={ [
				// 	validations.isInteger,
				// 	validations.minNumber( 0 ),
				// ] }
				inputWidth={ 3 }
				required
				min={ 0 }
				disabled
			/>,
		);
	}
	if ( indexOf( exclude, 'name' ) < 0 ) {
		inputs.push(
			<FormInput
				key="name"
				type="text"
				name={ `${ prefix }-name-${ ticketId }` }
				initialValue={ values[ `${ prefix }-name-${ ticketId }` ] || '' }
				label={ __( 'Ticket Label', 'event_espresso' ) }
				htmlId={ `${ prefix }-name-${ ticketId }` }
				minLength={ 3 }
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'description' ) < 0 ) {
		inputs.push(
			<FormInput
				key="description"
				type="textarea"
				name={ `${ prefix }-description-${ ticketId }` }
				initialValue={ values[ `${ prefix }-description-${ ticketId }` ] || '' }
				label={ __( 'Description', 'event_espresso' ) }
				htmlId={ `${ prefix }-description-${ ticketId }` }
			/>,
		);
	}
	if ( indexOf( exclude, 'price' ) < 0 ) {
		inputs.push(
			<FormInput
				key="price"
				type="number"
				name={ `${ prefix }-price-${ ticketId }` }
				initialValue={ values[ `${ prefix }-max-${ ticketId }` ] || null }
				label={ __( 'Ticket Price', 'event_espresso' ) }
				htmlId={ `${ prefix }-max-${ ticketId }` }
				helpText={ __(
					'The amount of money charged for this ticket. Leave blank' +
					' to make this ticket selection free.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
				step="0.01"
			/>,
		);
	}
	if ( indexOf( exclude, 'taxable' ) < 0 ) {
		inputs.push(
			<FormInput
				key="taxable"
				type="toggle"
				name={ `${ prefix }-taxable-${ ticketId }` }
				initialValue={ values[ `${ prefix }-taxable-${ ticketId }` ] || false }
				label={ __( 'Ticket is Taxable', 'event_espresso' ) }
				htmlId={ `${ prefix }-taxable-${ ticketId }` }
				helpTextIfChecked={ __(
					'This ticket is taxable. All configured taxes will be' +
					' applied to the price of this ticket upon purchase. ',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'click to make this ticket taxable',
					'event_espresso',
				) }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'start' ) < 0 ) {
		inputs.push(
			<FormInput
				key="start"
				type="datetime-local"
				name={ `${ prefix }-start-${ ticketId }` }
				initialValue={ values[ `${ prefix }-start-${ ticketId }` ] }
				label={ __( 'Ticket Sales Start', 'event_espresso' ) }
				htmlId={ `${ prefix }-start-${ ticketId }` }
				validations={ validations.required }
				inputWidth={ 6 }
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'end' ) < 0 ) {
		inputs.push(
			<FormInput
				key="end"
				type="datetime-local"
				name={ `${ prefix }-end-${ ticketId }` }
				initialValue={ values[ `${ prefix }-start-${ ticketId }` ] }
				label={ __( 'Ticket Sales End', 'event_espresso' ) }
				htmlId={ `${ prefix }-end-${ ticketId }` }
				validations={ validations.required }
				inputWidth={ 6 }
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'qty' ) < 0 ) {
		inputs.push(
			<FormInput
				key="qty"
				type="number"
				name={ `${ prefix }-qty-${ ticketId }` }
				initialValue={ values[ `${ prefix }-qty-${ ticketId }` ] || Infinity }
				label={ __( 'Quantity', 'event_espresso' ) }
				htmlId={ `${ prefix }-qty-${ ticketId }` }
				helpText={ __(
					'The maximum number of tickets available for sale. ' +
					'Leave blank for no limit.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'sold' ) < 0 ) {
		inputs.push(
			<FormInput
				key="sold"
				type="number"
				name={ `${ prefix }-sold-${ ticketId }` }
				initialValue={ values[ `${ prefix }-sold-${ ticketId }` ] || 0 }
				label={ __( 'Sold Count', 'event_espresso' ) }
				htmlId={ `${ prefix }-sold-${ ticketId }` }
				helpText={ __(
					'Quantity of tickets that have been' +
					' sold for this Ticket',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'reserved' ) < 0 ) {
		inputs.push(
			<FormInput
				key="reserved"
				type="number"
				name={ `${ prefix }-reserved-${ ticketId }` }
				initialValue={ values[ `${ prefix }-reserved-${ ticketId }` ] || 0 }
				label={ __( 'Reserved Count', 'event_espresso' ) }
				htmlId={ `${ prefix }-reserved-${ ticketId }` }
				helpText={ __(
					'Quantity of tickets reserved,' +
					' but not yet fully purchased',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'uses' ) < 0 ) {
		inputs.push(
			<FormInput
				key="uses"
				type="number"
				name={ `${ prefix }-uses-${ ticketId }` }
				initialValue={ values[ `${ prefix }-uses-${ ticketId }` ] || Infinity }
				label={ __( 'Number of Uses', 'event_espresso' ) }
				htmlId={ `${ prefix }-uses-${ ticketId }` }
				helpText={ __(
					'The number of event dates this ticket can be used for. ' +
					'Example: A ticket might have access to 4 different' +
					' dates, but setting this field to 2 would mean that the' +
					' ticket could only be used twice.' +
					'Leave blank for no limit.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'required' ) < 0 ) {
		inputs.push(
			<FormInput
				key="required"
				type="toggle"
				name={ `${ prefix }-required-${ ticketId }` }
				initialValue={ values[ `${ prefix }-required-${ ticketId }` ] || false }
				label={ __( 'Required', 'event_espresso' ) }
				htmlId={ `${ prefix }-required-${ ticketId }` }
				helpTextIfChecked={ __(
					'This ticket is required and must be purchased. It will' +
					' appear first in frontend ticket lists.',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'click to make this ticket a required selection.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'min' ) < 0 ) {
		inputs.push(
			<FormInput
				key="min"
				type="number"
				name={ `${ prefix }-min-${ ticketId }` }
				initialValue={ values[ `${ prefix }-min-${ ticketId }` ] || null }
				label={ __( 'Minimum Quantity', 'event_espresso' ) }
				htmlId={ `${ prefix }-min-${ ticketId }` }
				helpText={ __(
					'The minimum quantity that can be selected for this' +
					' ticket. Use this to create ticket bundles or graduated' +
					' pricing. Leave blank for no minimum.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'max' ) < 0 ) {
		inputs.push(
			<FormInput
				key="max"
				type="number"
				name={ `${ prefix }-max-${ ticketId }` }
				initialValue={ values[ `${ prefix }-max-${ ticketId }` ] || Infinity }
				label={ __( 'Maximum Quantity', 'event_espresso' ) }
				htmlId={ `${ prefix }-max-${ ticketId }` }
				helpText={ __(
					'The maximum quantity that can be selected for this' +
					' ticket. Use this to create ticket bundles or graduated' +
					' pricing. Leave blank for no maximum.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'order' ) < 0 ) {
		inputs.push(
			<FormInput
				key="order"
				type="number"
				name={ `${ prefix }-order-${ ticketId }` }
				initialValue={ values[ `${ prefix }-order-${ ticketId }` ] || 0 }
				label={ __( 'Display Order', 'event_espresso' ) }
				htmlId={ `${ prefix }-order-${ ticketId }` }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'isDefault' ) < 0 ) {
		inputs.push(
			<FormInput
				key="isDefault"
				type="toggle"
				name={ `${ prefix }-is-default-${ ticketId }` }
				initialValue={ values[ `${ prefix }-is-default-${ ticketId }` ] || false }
				label={ __( 'Default Ticket', 'event_espresso' ) }
				htmlId={ `${ prefix }-is-default-${ ticketId }` }
				helpTextIfChecked={ __(
					'this is a default ticket and will appear on all new' +
					' events',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'click to make this a default ticket for any new events',
					'event_espresso',
				) }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'wpUser' ) < 0 ) {
		inputs.push(
			<FormInput
				key="wpUser"
				type="number"
				name={ `${ prefix }-wp-user-${ ticketId }` }
				initialValue={ values[ `${ prefix }-wp-user-${ ticketId }` ] || 0 }
				label={ __( 'Parent Ticket', 'event_espresso' ) }
				htmlId={ `${ prefix }-wp-user-${ ticketId }` }
				helpText={ __(
					'The ID of the admin that created this ticket.',
					'event_espresso',
				) }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'parent' ) < 0 ) {
		inputs.push(
			<FormInput
				key="parent"
				type="text"
				name={ `${ prefix }-parent-${ ticketId }` }
				initialValue={ values[ `${ prefix }-parent-${ ticketId }` ] || 0 }
				label={ __( 'Parent Ticket', 'event_espresso' ) }
				htmlId={ `${ prefix }-parent-${ ticketId }` }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'deleted' ) < 0 ) {
		inputs.push(
			<FormInput
				key="deleted"
				type="toggle"
				name={ `${ prefix }-deleted-${ ticketId }` }
				initialValue={ values[ `${ prefix }-deleted-${ ticketId }` ] || false }
				label={ __( 'Archived', 'event_espresso' ) }
				htmlId={ `${ prefix }-deleted-${ ticketId }` }
				helpTextIfChecked={ __(
					'this ticket is archived',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'this ticket is NOT archived',
					'event_espresso',
				) }
				inputWidth={ 2 }
			/>,
		);
	}
	return inputs;
};
