/**
 * External imports
 */
import { indexOf } from 'lodash';
import { __, sprintf } from '@eventespresso/i18n';
import { validations } from '@eventespresso/components';
import {
	ServerDateTime as DateTime,
	Money,
	SiteCurrency,
} from '@eventespresso/value-objects';

/**
 * ticketEntityFormInputs
 * returns an array of inputs corresponding to
 * the properties of the Ticket Entity
 *
 * @function
 * @param {Object} ticket  EE Ticket object
 * @param {Object} calculator TicketPriceCalculatorFormModal
 * @param {Array} exclude  Array of field names to not display inputs for
 * @param {Array} currentValues  Array of input values
 * @param {Object} FormInput Input object to use
 * @param {function} recalculateBasePrice
 * @return {Object} rendered form
 */
export const ticketEntityFormInputs = (
	ticket,
	calculator,
	exclude = [],
	currentValues = [],
	FormInput,
	recalculateBasePrice,
) => {
	if ( ! ticket || ( ticket && ! ticket.id ) ) {
		return null;
	}
	const values = currentValues;
	const prefix = `ee-ticket-${ ticket.id }`;
	const inputs = [];
	if ( indexOf( exclude, 'TKT_ID' ) < 0 ) {
		inputs.push(
			<FormInput
				key="id"
				type="number"
				name={ `${ prefix }-id` }
				initialValue={ values[ `${ prefix }-id` ] }
				label={ __( 'Ticket ID', 'event_espresso' ) }
				htmlId={ `${ prefix }-id` }
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
				name={ `${ prefix }-name` }
				initialValue={ values[ `${ prefix }-name` ] || '' }
				label={ __( 'Ticket Label', 'event_espresso' ) }
				htmlId={ `${ prefix }-name` }
				minLength={ 3 }
				changeListener={
					( value ) => {
						ticket.name = value;
					}
				}
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'description' ) < 0 ) {
		inputs.push(
			<FormInput
				key="description"
				type="textarea"
				name={ `${ prefix }-description` }
				initialValue={ values[ `${ prefix }-description` ] || '' }
				label={ __( 'Description', 'event_espresso' ) }
				changeListener={
					( value ) => {
						ticket.description = value;
					}
				}
				htmlId={ `${ prefix }-description` }
			/>,
		);
	}
	if ( indexOf( exclude, 'price' ) < 0 ) {
		inputs.push(
			<FormInput
				key="price"
				type="number"
				name={ `${ prefix }-price` }
				initialValue={ values[ `${ prefix }-price` ] || null }
				label={ __( 'Ticket Price', 'event_espresso' ) }
				htmlId={ `${ prefix }-price` }
				helpText={ sprintf(
					__(
						'The amount of money charged for this ticket. Leave blank to make this ticket selection free.%sClick the button after the input to use the Ticket Price Calculator (warning: will close this edit form)',
						'event_espresso'
					),
					' \n'
				) }
				inputWidth={ 3 }
				min={ 0 }
				step="0.01"
				changeListener={
					( value, prevValue ) => {
						if ( value !== prevValue ) {
							ticket.price = new Money(
								value || 0,
								SiteCurrency
							);
							recalculateBasePrice();
						}
					}
				}
				afterInput={ calculator }
			/>
		);
	}
	if ( indexOf( exclude, 'taxable' ) < 0 ) {
		inputs.push(
			<FormInput
				key="taxable"
				type="toggle"
				name={ `${ prefix }-taxable` }
				initialValue={ values[ `${ prefix }-taxable` ] || false }
				label={ __( 'Ticket is Taxable', 'event_espresso' ) }
				htmlId={ `${ prefix }-taxable` }
				helpTextIfChecked={ __(
					'This ticket is taxable. All configured taxes will be' +
					' applied to the price of this ticket upon purchase. ',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'click to make this ticket taxable',
					'event_espresso',
				) }
				changeListener={
					( value ) => {
						ticket.taxable = !! value;
					}
				}
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'start' ) < 0 ) {
		inputs.push(
			<FormInput
				key="start"
				type="datetime-local"
				name={ `${ prefix }-start` }
				initialValue={ values[ `${ prefix }-start` ] }
				label={ __( 'Ticket Sales Start', 'event_espresso' ) }
				htmlId={ `${ prefix }-start` }
				validations={ validations.required }
				inputWidth={ 6 }
				changeListener={
					( value, prevValue ) => {
						if ( value !== prevValue ) {
							ticket.startDate = new DateTime( value );
						}
					}
				}
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'end' ) < 0 ) {
		inputs.push(
			<FormInput
				key="end"
				type="datetime-local"
				name={ `${ prefix }-end` }
				initialValue={ values[ `${ prefix }-end` ] }
				label={ __( 'Ticket Sales End', 'event_espresso' ) }
				htmlId={ `${ prefix }-end` }
				validations={ validations.required }
				inputWidth={ 6 }
				changeListener={
					( value, prevValue ) => {
						if ( value !== prevValue ) {
							ticket.endDate = new DateTime( value );
						}
					}
				}
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'qty' ) < 0 ) {
		inputs.push(
			<FormInput
				key="qty"
				type="number"
				name={ `${ prefix }-qty` }
				initialValue={ values[ `${ prefix }-qty` ] || Infinity }
				label={ __( 'Quantity', 'event_espresso' ) }
				htmlId={ `${ prefix }-qty` }
				helpText={ __(
					'The maximum number of tickets available for sale. ' +
					'Leave blank for no limit.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				changeListener={
					( value ) => {
						ticket.qty = parseInt( value || -1, 10 );
					}
				}
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'sold' ) < 0 ) {
		inputs.push(
			<FormInput
				key="sold"
				type="number"
				name={ `${ prefix }-sold` }
				initialValue={ values[ `${ prefix }-sold` ] || 0 }
				label={ __( 'Sold Count', 'event_espresso' ) }
				htmlId={ `${ prefix }-sold` }
				helpText={ __(
					'Quantity of tickets that have been' +
					' sold for this Ticket',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
				disabled
			/>,
		);
	}
	if ( indexOf( exclude, 'reserved' ) < 0 ) {
		inputs.push(
			<FormInput
				key="reserved"
				type="number"
				name={ `${ prefix }-reserved` }
				initialValue={ values[ `${ prefix }-reserved` ] || 0 }
				label={ __( 'Reserved Count', 'event_espresso' ) }
				htmlId={ `${ prefix }-reserved` }
				helpText={ __(
					'Quantity of tickets reserved,' +
					' but not yet fully purchased',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
				disabled
			/>,
		);
	}
	if ( indexOf( exclude, 'uses' ) < 0 ) {
		inputs.push(
			<FormInput
				key="uses"
				type="number"
				name={ `${ prefix }-uses` }
				initialValue={ values[ `${ prefix }-uses` ] || Infinity }
				label={ __( 'Number of Uses', 'event_espresso' ) }
				htmlId={ `${ prefix }-uses` }
				helpText={ sprintf(
					__(
						'Controls the total number of times this ticket can be used, regardless of the number of dates it is assigned to.%sExample: A ticket might have access to 4 different dates, but setting this field to 2 would mean that the ticket could only be used twice. Leave blank for no limit.',
						'event_espresso',
					),
					'\n'
				) }
				inputWidth={ 3 }
				changeListener={
					( value ) => {
						ticket.uses = parseInt( value || -1, 10 );
					}
				}
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'required' ) < 0 ) {
		inputs.push(
			<FormInput
				key="required"
				type="toggle"
				name={ `${ prefix }-required` }
				initialValue={ values[ `${ prefix }-required` ] || false }
				label={ __( 'Required', 'event_espresso' ) }
				htmlId={ `${ prefix }-required` }
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
				changeListener={
					( value ) => {
						ticket.required = !! value;
					}
				}
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'min' ) < 0 ) {
		inputs.push(
			<FormInput
				key="min"
				type="number"
				name={ `${ prefix }-min` }
				initialValue={ values[ `${ prefix }-min` ] || null }
				label={ __( 'Minimum Quantity', 'event_espresso' ) }
				htmlId={ `${ prefix }-min` }
				helpText={ __(
					'The minimum quantity that can be selected for this' +
					' ticket. Use this to create ticket bundles or graduated' +
					' pricing. Leave blank for no minimum.',
					'event_espresso',
				) }
				changeListener={
					( value ) => {
						ticket.min = parseInt( value || 0, 10 );
					}
				}
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
				name={ `${ prefix }-max` }
				initialValue={ values[ `${ prefix }-max` ] || Infinity }
				label={ __( 'Maximum Quantity', 'event_espresso' ) }
				htmlId={ `${ prefix }-max` }
				helpText={ __(
					'The maximum quantity that can be selected for this' +
					' ticket. Use this to create ticket bundles or graduated' +
					' pricing. Leave blank for no maximum.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				changeListener={
					( value ) => {
						ticket.max = parseInt( value || -1, 10 );
					}
				}
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'order' ) < 0 ) {
		inputs.push(
			<FormInput
				key="order"
				type="number"
				name={ `${ prefix }-order` }
				initialValue={ values[ `${ prefix }-order` ] || 0 }
				label={ __( 'Display Order', 'event_espresso' ) }
				htmlId={ `${ prefix }-order` }
				inputWidth={ 2 }
				changeListener={
					( value ) => {
						ticket.order = parseInt( value, 10 );
					}
				}
			/>,
		);
	}
	if ( indexOf( exclude, 'isDefault' ) < 0 ) {
		inputs.push(
			<FormInput
				key="isDefault"
				type="toggle"
				name={ `${ prefix }-is-default` }
				initialValue={ values[ `${ prefix }-is-default` ] || false }
				label={ __( 'Default Ticket', 'event_espresso' ) }
				htmlId={ `${ prefix }-is-default` }
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
				changeListener={
					( value ) => {
						ticket.isDefault = !! value;
					}
				}
			/>,
		);
	}
	if ( indexOf( exclude, 'wpUser' ) < 0 ) {
		// @todo this needs to read from the current event author in the loaded
		// editor, and eventually could be a dropdown for selecting the author.
		inputs.push(
			<FormInput
				key="wpUser"
				type="number"
				name={ `${ prefix }-wp-user` }
				initialValue={ values[ `${ prefix }-wp-user` ] || 0 }
				label={ __( 'Parent Ticket', 'event_espresso' ) }
				htmlId={ `${ prefix }-wp-user` }
				helpText={ __(
					'The ID of the admin that created this ticket.',
					'event_espresso',
				) }
				inputWidth={ 2 }
				disabled
			/>,
		);
	}
	if ( indexOf( exclude, 'parent' ) < 0 ) {
		// @todo this is mostly a field that was added originally as a way of
		// tracking autosaves/revisions for tickets. Probably should never be
		// an editable field.
		inputs.push(
			<FormInput
				key="parent"
				type="text"
				name={ `${ prefix }-parent` }
				initialValue={ values[ `${ prefix }-parent` ] || 0 }
				label={ __( 'Parent Ticket', 'event_espresso' ) }
				htmlId={ `${ prefix }-parent` }
				inputWidth={ 2 }
				disabled
			/>,
		);
	}
	if ( indexOf( exclude, 'deleted' ) < 0 ) {
		inputs.push(
			<FormInput
				key="deleted"
				type="toggle"
				name={ `${ prefix }-deleted` }
				initialValue={ values[ `${ prefix }-deleted` ] || false }
				label={ __( 'Archived', 'event_espresso' ) }
				htmlId={ `${ prefix }-deleted` }
				helpTextIfChecked={ __(
					'this ticket is archived',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'this ticket is NOT archived',
					'event_espresso',
				) }
				inputWidth={ 2 }
				disabled
			/>,
		);
	}
	return inputs;
};
