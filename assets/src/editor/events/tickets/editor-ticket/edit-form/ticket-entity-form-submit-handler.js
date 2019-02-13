/**
 * updates Ticket Entity properties given the supplied form data
 *
 * @function
 * @param {Object} ticket
 * @param {Object} formData
 * @return {Object} updates ticket
 */
export const ticketEntityFormSubmitHandler = ( ticket, formData ) => {
	ticket.name = formData[ `ee-ticket-name-${ ticket.id }` ];
	ticket.description = formData[ `ee-ticket-description-${ ticket.id }` ];
	ticket.qty = formData[ `ee-ticket-qty-${ ticket.id }` ];
	ticket.uses = formData[ `ee-ticket-uses-${ ticket.id }` ];
	ticket.required = formData[ `ee-ticket-required-${ ticket.id }` ];
	ticket.min = formData[ `ee-ticket-min-${ ticket.id }` ];
	ticket.max = formData[ `ee-ticket-max-${ ticket.id }` ];
	ticket.price = formData[ `ee-ticket-price-${ ticket.id }` ];
	ticket.startDate = formData[ `ee-ticket-start-${ ticket.id }` ];
	ticket.endDate = formData[ `ee-ticket-end-${ ticket.id }` ];
	ticket.taxable = formData[ `ee-ticket-taxable-${ ticket.id }` ];
	ticket.order = formData[ `ee-ticket-order-${ ticket.id }` ];
	ticket.isDefault = formData[ `ee-ticket-is-default-${ ticket.id }` ];
	ticket.wpUser = formData[ `ee-ticket-wp-user-${ ticket.id }` ];
	ticket.parent = formData[ `ee-ticket-parent-${ ticket.id }` ];
	ticket.deleted = formData[ `ee-ticket-deleted-${ ticket.id }` ];
	return ticket;
};
