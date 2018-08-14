
/**
 * editEventDate
 *
 * @function
 * @param {Object} event
 * @param {Object} data    JSON object defining the Event Date
 */
export const editEventDate = ( event, data ) => {
	event.preventDefault();
	console.log( ' >>> CLICK <<< EDIT EVENT DATE data.eventDate', data.eventDate );
};
