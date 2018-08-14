/**
 * viewEventDateTickets
 *
 * @function
 * @param {Object} event
 * @param {Object} data    JSON object defining the Event Date
 */
export const viewEventDateTickets = ( event, data ) => {
	event.preventDefault();
	console.log( ' >>> CLICK <<< VIEW EVENT DATE TICKETS data.eventDate', data.eventDate );
};
