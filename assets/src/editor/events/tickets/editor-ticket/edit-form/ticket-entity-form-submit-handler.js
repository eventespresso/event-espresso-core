/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { ticketModel } from '@eventespresso/model';
import { DateTime, Money, SiteCurrency } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: TICKET } = ticketModel;

/**
 * updates Ticket Entity properties given the supplied form data
 *
 * @function
 * @param {Object} ticket
 * @param {Object} formData
 * @return {Object} updates ticket
 */
export const ticketEntityFormSubmitHandler = async ( ticket, formData ) => {
	if ( ! isModelEntityOfModel( ticket, TICKET ) ) {
		return null;
	}
	const id = ticket.id;
	const prefix = 'ee-ticket';
	ticket.name = formData[ `${ prefix }-name-${ id }` ];
	ticket.description = formData[ `${ prefix }-description-${ id }` ];
	ticket.qty = parseInt( formData[ `${ prefix }-qty-${ id }` ] );
	ticket.uses = parseInt( formData[ `${ prefix }-uses-${ id }` ] );
	ticket.required = !! formData[ `${ prefix }-required-${ id }` ];
	ticket.min = parseInt( formData[ `${ prefix }-min-${ id }` ] );
	ticket.max = parseInt( formData[ `${ prefix }-max-${ id }` ] );
	ticket.price = new Money(
		formData[ `${ prefix }-price-${ id }` ],
		SiteCurrency
	);
	ticket.startDate = new DateTime( formData[ `${ prefix }-start-${ id }` ] );
	ticket.endDate = new DateTime( formData[ `${ prefix }-end-${ id }` ] );
	ticket.taxable = !! formData[ `${ prefix }-taxable-${ id }` ];
	ticket.order = parseInt( formData[ `${ prefix }-order-${ id }` ] );
	ticket.isDefault = formData[ `${ prefix }-is-default-${ id }` ];
	ticket.wpUser = parseInt( formData[ `${ prefix }-wp-user-${ id }` ] );
	ticket.parent = parseInt( formData[ `${ prefix }-parent-${ id }` ] );
	ticket.deleted = !! formData[ `${ prefix }-deleted-${ id }` ];
	return await dispatch( 'eventespresso/core' ).persistEntityRecord(
		TICKET,
		ticket
	);
};
