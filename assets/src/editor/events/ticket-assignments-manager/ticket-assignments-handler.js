/**
 * External imports
 */
import { find, findIndex, isArray, isEmpty, isUndefined, omitBy } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';

const noIndex = -1;

/**
 * @function
 * @param {Object} assigned
 * @param {Object} date
 * @param {Object} ticket
 * @param {boolean} returnIndex
 * @return {number|boolean} index for date id in assigned array or
 *                        boolean if returnIndex is false
 */
export const isAssigned = ( assigned, date, ticket, returnIndex = false ) => {
	let index = noIndex;
	if ( isArray( assigned[ date.id ] ) ) {
		index = findIndex( assigned[ date.id ], { id: ticket.id } );
	}
	return returnIndex ? index : index > noIndex;
};

/**
 * @function
 * @param {Array} dateEntities
 * @param {Object} assigned
 * @param {Function} addTickets
 * @param {Object} removed
 * @param {Function} removeTicketEntities
 * @return {Promise} resolves to true if updates occurred
 */
export const processChanges = (
	dateEntities,
	assigned,
	addTickets,
	removed,
	removeTicketEntities
) => {
	const relationUpdates = [];
	for ( const dateID in removed ) {
		const dateEntity = find(
			dateEntities,
			( date ) => {
				return date.id === dateID ||
					date.id === parseInt( dateID, 10 );
			}
		);
		if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			const ticketsToRemove = removed[ dateID ];
			if ( isArray( ticketsToRemove ) ) {
				relationUpdates.push(
					removeTicketEntities( dateEntity, ticketsToRemove )
				);
			}
		}
	}
	for ( const dateID in assigned ) {
		const dateEntity = find(
			dateEntities,
			( date ) => {
				return date.id === dateID ||
					date.id === parseInt( dateID, 10 );
			}
		);
		if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			const ticketsToAssign = assigned[ dateID ];
			if ( isArray( ticketsToAssign ) ) {
				relationUpdates.push(
					addTickets( dateEntity, ticketsToAssign )
				);
			}
		}
	}
	return Promise.all( relationUpdates );
};

/**
 * @function
 * @param {Object} assigned
 * @param {Object} dateEntity
 * @param {Object} ticketEntity
 * @param {number} index
 * @return {Object} assigned
 */
export const unAssignTicketEntity = ( assigned, dateEntity, ticketEntity, index = noIndex ) => {
	index = index === noIndex ?
		isAssigned( assigned, dateEntity, ticketEntity, true ) :
		index;
	if ( index > noIndex ) {
		assigned[ dateEntity.id ].splice( index, 1 );
		if ( isEmpty( assigned[ dateEntity.id ] ) ) {
			delete assigned[ dateEntity.id ];
		}
	}
	return omitBy( assigned, isUndefined );
};

/**
 * @function
 * @param {Object} prevState
 * @param {Object} dateEntity
 * @param {Object} ticketEntity
 * @return {Object} updated state
 */
export const assignTicketEntity = ( prevState, dateEntity, ticketEntity ) => {
	const index = isRemoved( prevState.removed, dateEntity, ticketEntity, true );
	if ( index > noIndex ) {
		prevState.removed = unRemoveTicketEntity(
			prevState.removed,
			dateEntity,
			ticketEntity,
			index
		);
	} else {
		if ( ! isArray( prevState.assigned[ dateEntity.id ] ) ) {
			prevState.assigned[ dateEntity.id ] = [];
		}
		if ( ! isAssigned( prevState.assigned, dateEntity, ticketEntity ) ) {
			prevState.assigned[ dateEntity.id ].push( ticketEntity );
		}
	}
	return cleanState( prevState );
};

/**
 * @function
 * @param {Object} assigned
 * @param {Object} dateEntity
 * @param {Object} ticketEntity
 * @return {number}    		the number of dateEntity tickets in assigned
 *              			collection matching supplied ticket
 */
export const assignedCount = ( assigned, dateEntity = null, ticketEntity = null ) => {
	if ( dateEntity && dateEntity.id && isArray( assigned[ dateEntity.id ] ) ) {
		return assigned[ dateEntity.id ].length;
	}
	let index = 0;
	let count = 0;
	if ( ticketEntity && ticketEntity.id ) {
		for ( const dateID in assigned ) {
			if ( isArray( assigned[ dateID ] ) ) {
				index = findIndex( assigned[ dateID ], { id: ticketEntity.id } );
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
 * @param {Object} dateEntity
 * @param {Object} ticketEntity
 * @param {boolean} returnIndex
 * @return {number|boolean} index for date id in removed array or
 *                        boolean if returnIndex is false
 */
export const isRemoved = ( removed, dateEntity, ticketEntity, returnIndex = false ) => {
	let index = noIndex;
	if ( isArray( removed[ dateEntity.id ] ) ) {
		index = findIndex( removed[ dateEntity.id ], { id: ticketEntity.id } );
	}
	return returnIndex ? index : index > noIndex;
};

/**
 * @function
 * @param {Object} removed
 * @param {Object} dateEntity
 * @param {Object} ticketEntity
 * @param {number} index
 * @return {Object} removed
 */
export const unRemoveTicketEntity = ( removed, dateEntity, ticketEntity, index = noIndex ) => {
	index = index === noIndex ?
		isRemoved( removed, dateEntity, ticketEntity, true ) :
		index;
	if ( index > noIndex ) {
		removed[ dateEntity.id ].splice( index, 1 );
		if ( isEmpty( removed[ dateEntity.id ] ) ) {
			delete removed[ dateEntity.id ];
		}
	}
	return removed;
};

/**
 * @function
 * @param {Object} prevState
 * @param {Object} dateEntity
 * @param {Object} ticketEntity
 * @return {Object} updated state
 */
export const removeTicketEntity = ( prevState, dateEntity, ticketEntity ) => {
	const index = isAssigned( prevState.assigned, dateEntity, ticketEntity, true );
	if ( index > noIndex ) {
		prevState.assigned = unAssignTicketEntity(
			prevState.assigned,
			dateEntity,
			ticketEntity,
			index
		);
	} else {
		if ( ! isArray( prevState.removed[ dateEntity.id ] ) ) {
			prevState.removed[ dateEntity.id ] = [];
		}
		if ( ! isRemoved( prevState.removed, dateEntity, ticketEntity ) ) {
			prevState.removed[ dateEntity.id ].push( ticketEntity );
		}
	}
	return cleanState( prevState );
};

/**
 * @function
 * @param {Object} removed
 * @param {Object} dateEntity
 * @param {Object} ticketEntity
 * @return {number}    		the number of date tickets in removed
 *              			collection matching supplied ticket
 */
export const removedCount = ( removed, dateEntity = null, ticketEntity = null ) => {
	if ( dateEntity && dateEntity.id && isArray( removed[ dateEntity.id ] ) ) {
		return removed[ dateEntity.id ].length;
	}
	let index = 0;
	let count = 0;
	if ( ticketEntity && ticketEntity.id ) {
		for ( const dateID in removed ) {
			if ( isArray( removed[ dateID ] ) ) {
				index = findIndex( removed[ dateID ], { id: ticketEntity.id } );
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
