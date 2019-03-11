/**
 * External imports
 */
import { ticketModel } from '@eventespresso/model';
import { DateTime, Money, SiteCurrency } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { updateTicket } from '../action-handlers/update-ticket';

const { MODEL_NAME: TICKET } = ticketModel;

/**
 * updates Ticket Entity properties given the supplied form data
 *
 * @function
 * @param {Object} ticketEntity
 * @param {Object} formData
 * @return {Promise} updated ticketEntity upon resolution
 */
export const ticketEntityFormSubmitHandler = async ( ticketEntity, formData ) => {
	if ( ! isModelEntityOfModel( ticketEntity, TICKET ) ) {
		return null;
	}
	const prefix = `ee-ticket-${ ticketEntity.id }`;
	ticketEntity.name = formData[ `${ prefix }-name` ];
	ticketEntity.description = formData[ `${ prefix }-description` ];
	ticketEntity.qty = parseInt( formData[ `${ prefix }-qty` ] || -1 );
	ticketEntity.uses = parseInt( formData[ `${ prefix }-uses` ] || -1 );
	ticketEntity.required = !! formData[ `${ prefix }-required` ];
	ticketEntity.min = parseInt( formData[ `${ prefix }-min` ] || 0 );
	ticketEntity.max = parseInt( formData[ `${ prefix }-max` ] || -1 );
	ticketEntity.price = new Money(
		formData[ `${ prefix }-price` ] || 0,
		SiteCurrency
	);
	ticketEntity.startDate = new DateTime( formData[ `${ prefix }-start` ] );
	ticketEntity.endDate = new DateTime( formData[ `${ prefix }-end` ] );
	ticketEntity.taxable = !! formData[ `${ prefix }-taxable` ];
	ticketEntity.order = parseInt( formData[ `${ prefix }-order` ] );
	ticketEntity.isDefault = !! formData[ `${ prefix }-is-default` ];
	ticketEntity.wpUser = parseInt( formData[ `${ prefix }-wp-user` ] || 0 );
	ticketEntity.parent = parseInt( formData[ `${ prefix }-parent` ] || 0 );
	ticketEntity.deleted = !! formData[ `${ prefix }-deleted` ];
	return updateTicket( ticketEntity );
};
