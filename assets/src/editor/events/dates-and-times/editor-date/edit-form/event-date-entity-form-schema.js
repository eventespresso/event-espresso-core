/**
 * returns an object mapping
 * Event Date Entity properties
 * to form inputs
 *
 * @function
 * @param {Object} eventDate  EE Date object
 * @return {Object} rendered form
 */
export const eventDateEntityFormSchema = eventDate => {
	// console.log( 'eventDateEntityFormSchema() eventDate', eventDate );
	return {
		[ `ee-event-date-id-${ eventDate.id }` ]: eventDate.id,
		[ `ee-event-date-event-id-${ eventDate.id }` ]: eventDate.EVT_ID,
		[ `ee-event-date-name-${ eventDate.id }` ]: eventDate.name || '',
		[ `ee-event-date-description-${ eventDate.id }` ]: eventDate.description || '',
		[ `ee-event-date-start-${ eventDate.id }` ]: eventDate.start,
		[ `ee-event-date-end-${ eventDate.id }` ]: eventDate.end,
		[ `ee-event-date-reg-limit-${ eventDate.id }` ]: stripInfinity(
			eventDate.regLimit
		),
		[ `ee-event-date-sold-${ eventDate.id }` ]: eventDate.sold || 0,
		[ `ee-event-date-reserved-${ eventDate.id }` ]: eventDate.reserved || 0,
		[ `ee-event-date-is-primary-${ eventDate.id }` ]: eventDate.isPrimary || false,
		[ `ee-event-date-order-${ eventDate.id }` ]: eventDate.order || 0,
		[ `ee-event-date-parent-${ eventDate.id }` ]: eventDate.parent || 0,
		[ `ee-event-date-deleted-${ eventDate.id }` ]: eventDate.deleted || false,
	};
};

const stripInfinity = number => number !== 'INF' || number !== Infinity ?
	number :
	null;
