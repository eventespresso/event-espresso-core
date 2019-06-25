/**
 * External imports
 */
import { isArray, isEmpty, isUndefined, omitBy } from 'lodash';

const noIndex = -1;

/**
 * @function
 * @param {Object} assigned
 * @param {number} dateId
 * @param {number} ticketId
 * @param {boolean} returnIndex
 * @return {number|boolean} index for date id in assigned array or
 *                        boolean if returnIndex is false
 */
export const isAssigned = ( assigned, dateId, ticketId, returnIndex = false ) => {
	let index = noIndex;
	if ( isArray( assigned[ dateId ] ) ) {
		index = assigned[ dateId ].indexOf( ticketId );
	}
	return returnIndex ? index : index > noIndex;
};

/**
 * @function
 * @param {Object} assigned
 * @param {Function} addTickets
 * @param {Object} removed
 * @param {Function} removeTicketEntities
 * @return {Promise} resolves to true if updates occurred
 */
export const processChanges = (
	assigned,
	addTickets,
	removed,
	removeTicketEntities
) => {
	const relationUpdates = [];
	for ( const dateId in removed ) {
		const ticketIdsToRemove = removed[ dateId ];
		if ( isArray( ticketIdsToRemove ) ) {
			relationUpdates.push(
				removeTicketEntities( dateId, ticketIdsToRemove )
			);
		}
	}
	for ( const dateId in assigned ) {
		const ticketIdsToAssign = assigned[ dateId ];
		if ( isArray( ticketIdsToAssign ) ) {
			relationUpdates.push(
				addTickets( dateId, ticketIdsToAssign )
			);
		}
	}
	return Promise.all( relationUpdates );
};

/**
 * @function
 * @param {Object} assigned
 * @param {number} dateId
 * @param {number} ticketId
 * @param {number} index
 * @return {Object} assigned
 */
export const unAssignTicketEntity = ( assigned, dateId, ticketId, index = noIndex ) => {
	index = index === noIndex ?
		isAssigned( assigned, dateId, ticketId, true ) :
		index;
	if ( index > noIndex ) {
		assigned[ dateId ].splice( index, 1 );
		if ( isEmpty( assigned[ dateId ] ) ) {
			delete assigned[ dateId ];
		}
	}
	return omitBy( assigned, isUndefined );
};

/**
 * @function
 * @param {Object} prevState
 * @param {number} dateId
 * @param {number} ticketId
 * @return {Object} updated state
 */
export const assignTicketEntity = ( prevState, dateId, ticketId ) => {
	const index = isRemoved( prevState.removed, dateId, ticketId, true );
	if ( index > noIndex ) {
		prevState.removed = unRemoveTicketEntity(
			prevState.removed,
			dateId,
			ticketId,
			index
		);
	} else {
		if ( ! isArray( prevState.assigned[ dateId ] ) ) {
			prevState.assigned[ dateId ] = [];
		}
		if ( ! isAssigned( prevState.assigned, dateId, ticketId ) ) {
			prevState.assigned[ dateId ].push( ticketId );
		}
	}
	return cleanState( prevState );
};

/**
 * @function
 * @param {Object} assigned
 * @param {number} dateId
 * @param {number} ticketId
 * @return {number}    		the number of dateEntity tickets in assigned
 *              			collection matching supplied ticket
 */
export const assignedCount = ( assigned, dateId = 0, ticketId = 0 ) => {
	if ( dateId && isArray( assigned[ dateId ] ) ) {
		return assigned[ dateId ].length;
	}
	let index = 0;
	let count = 0;
	if ( ticketId ) {
		for ( const dateID in assigned ) {
			if ( isArray( assigned[ dateID ] ) ) {
				index = assigned[ dateID ].indexOf( ticketId );
				if ( index > noIndex ) {
					count++;
				}
			}
		}
	}
	return count;
};

/**
 * @function
 * @param {Object} removed
 * @param {number} dateId
 * @param {number} ticketId
 * @param {boolean} returnIndex
 * @return {number|boolean} index for date id in removed array or
 *                        boolean if returnIndex is false
 */
export const isRemoved = ( removed, dateId, ticketId, returnIndex = false ) => {
	let index = noIndex;
	if ( isArray( removed[ dateId ] ) ) {
		index = removed[ dateId ].indexOf( ticketId );
	}
	return returnIndex ? index : index > noIndex;
};

/**
 * @function
 * @param {Object} removed
 * @param {number} dateId
 * @param {number} ticketId
 * @param {number} index
 * @return {Object} removed
 */
export const unRemoveTicketEntity = ( removed, dateId, ticketId, index = noIndex ) => {
	index = index === noIndex ?
		isRemoved( removed, dateId, ticketId, true ) :
		index;
	if ( index > noIndex ) {
		removed[ dateId ].splice( index, 1 );
		if ( isEmpty( removed[ dateId ] ) ) {
			delete removed[ dateId ];
		}
	}
	return removed;
};

/**
 * @function
 * @param {Object} prevState
 * @param {number} dateId
 * @param {number} ticketId
 * @return {Object} updated state
 */
export const removeTicketEntity = ( prevState, dateId, ticketId ) => {
	const index = isAssigned( prevState.assigned, dateId, ticketId, true );
	if ( index > noIndex ) {
		prevState.assigned = unAssignTicketEntity(
			prevState.assigned,
			dateId,
			ticketId,
			index
		);
	} else {
		if ( ! isArray( prevState.removed[ dateId ] ) ) {
			prevState.removed[ dateId ] = [];
		}
		if ( ! isRemoved( prevState.removed, dateId, ticketId ) ) {
			prevState.removed[ dateId ].push( ticketId );
		}
	}
	return cleanState( prevState );
};

/**
 * @function
 * @param {Object} removed
 * @param {number} dateId
 * @param {number} ticketId
 * @return {number}    		the number of date tickets in removed
 *              			collection matching supplied ticket
 */
export const removedCount = ( removed, dateId = 0, ticketId = 0 ) => {
	if ( dateId && isArray( removed[ dateId ] ) ) {
		return removed[ dateId ].length;
	}
	let index = 0;
	let count = 0;
	if ( ticketId ) {
		for ( const dateID in removed ) {
			if ( isArray( removed[ dateID ] ) ) {
				index = removed[ dateID ].indexOf( ticketId );
				if ( index > noIndex ) {
					count++;
				}
			}
		}
	}
	return count;
};

/**
 * @function
 * @param {Object} prevState
 * @return {Object} updated state
 */
const cleanState = ( prevState ) => {
	const assigned = omitBy( prevState.assigned, isUndefined );
	const removed = omitBy( prevState.removed, isUndefined );
	return { assigned, removed };
};
