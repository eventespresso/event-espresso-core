/**
 * updates Event Date Entity properties
 * given the supplied form data
 *
 * @function
 * @param {Object} eventDate  EE Date object
 * @param {Object} formData
 * @return {Object} updates eventDate
 */
export const eventDateEntityFormSubmitHandler = ( eventDate, formData ) => {
	eventDate.name = formData[ `ee-event-date-name-${ eventDate.id }` ];
	eventDate.description = formData[ `ee-event-date-description-${ eventDate.id }` ];
	eventDate.start = formData[ `ee-event-date-start-${ eventDate.id }` ];
	eventDate.end = formData[ `ee-event-date-end-${ eventDate.id }` ];
	eventDate.regLimit = formData[ `ee-event-date-reg-limit-${ eventDate.id }` ];
	eventDate.isPrimary = formData[ `ee-event-date-is-primary-${ eventDate.id }` ];
	eventDate.order = formData[ `ee-event-date-order-${ eventDate.id }` ];
	eventDate.parent = formData[ `ee-event-date-parent-${ eventDate.id }` ];
	eventDate.deleted = formData[ `ee-event-date-deleted-${ eventDate.id }` ];
	return eventDate;
};
