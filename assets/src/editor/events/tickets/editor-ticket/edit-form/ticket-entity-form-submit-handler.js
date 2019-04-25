/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';
import { DateTime, Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import { updateTicket } from '../action-handlers/update-ticket';

/**
 * updates Ticket Entity properties given the supplied form data
 *
 * @function
 * @param {Object} ticket
 * @param {Object} formData
 * @return {Object} updated ticket
 */
export const ticketEntityFormSubmitHandler = async ( { ticket, formData } ) => {
	if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
		return null;
	}
	const prefix = `ee-ticket-${ ticket.id }`;
	ticket.name = formData[ `${ prefix }-name` ];
	ticket.description = formData[ `${ prefix }-description` ];
	ticket.qty = parseInt( formData[ `${ prefix }-qty` ] || -1 );
	ticket.uses = parseInt( formData[ `${ prefix }-uses` ] || -1 );
	ticket.required = !! formData[ `${ prefix }-required` ];
	ticket.min = parseInt( formData[ `${ prefix }-min` ] || 0 );
	ticket.max = parseInt( formData[ `${ prefix }-max` ] || -1 );
	ticket.price = new Money(
		formData[ `${ prefix }-price` ] || 0,
		SiteCurrency
	);
	ticket.startDate = new DateTime( formData[ `${ prefix }-start` ] );
	ticket.endDate = new DateTime( formData[ `${ prefix }-end` ] );
	ticket.taxable = !! formData[ `${ prefix }-taxable` ];
	ticket.order = parseInt( formData[ `${ prefix }-order` ] );
	ticket.isDefault = !! formData[ `${ prefix }-is-default` ];
	ticket.wpUser = parseInt( formData[ `${ prefix }-wp-user` ] || 0 );
	ticket.parent = parseInt( formData[ `${ prefix }-parent` ] || 0 );
	ticket.deleted = !! formData[ `${ prefix }-deleted` ];
	return await updateTicket( ticket );
};
