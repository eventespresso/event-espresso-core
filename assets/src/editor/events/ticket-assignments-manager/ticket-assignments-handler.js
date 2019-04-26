/**
 * External imports
 */
import { find, findIndex, isArray, isEmpty, isUndefined, omitBy } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';

const noIndex = -1;

/**
 * @function
 * @param {Array} dates
 * @param {Object} assigned
 * @param {Function} addTickets
 * @param {Object} removed
 * @param {Function} removeTickets
 * @return {Promise} resolves to true if updates occurred
 */
export const processChanges = (
	dates,
	assigned,
	addTickets,
	removed,
	removeTickets
) => {
	const relationUpdates = [];
	for ( let dateID in removed ) {
		dateID = parseInt( dateID );
		const date = find( dates, { id: dateID } );
		if ( isModelEntityOfModel( date, 'datetime' ) ) {
			const ticketsToRemove = removed[ dateID ];
			if ( isArray( ticketsToRemove ) ) {
				relationUpdates.push(
					removeTickets( date, ticketsToRemove )
				);
			}
		}
	}
	for ( let dateID in assigned ) {
		dateID = parseInt( dateID );
		const date = find( dates, { id: dateID } );
		if ( isModelEntityOfModel( date, 'datetime' ) ) {
			const ticketsToAssign = assigned[ dateID ];
			if ( isArray( ticketsToAssign ) ) {
				relationUpdates.push(
					addTickets( date, ticketsToAssign )
				);
			}
		}
	}
	return Promise.all( relationUpdates );
};

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
 * @param {Object} assigned
 * @param {Object} date
 * @param {Object} ticket
 * @param {number} index
 * @return {Object} assigned
 */
export const unAssignTicket = ( assigned, date, ticket, index = noIndex ) => {
	index = index === noIndex ?
		isAssigned( assigned, date, ticket, true ) :
		index;
	if ( index > noIndex ) {
		assigned[ date.id ].splice( index, 1 );
		if ( isEmpty( assigned[ date.id ] ) ) {
			delete assigned[ date.id ];
		}
	}
	return omitBy( assigned, isUndefined );
};

/**
 * @function
 * @param {Object} prevState
 * @param {Object} date
 * @param {Object} ticket
 * @return {Object} updated state
 */
export const assignTicket = ( prevState, date, ticket ) => {
	const index = isRemoved( prevState.removed, date, ticket, true );
	if ( index > noIndex ) {
		prevState.removed = unRemoveTicket(
			prevState.removed,
			date,
			ticket,
			index
		);
	} else {
		if ( ! isArray( prevState.assigned[ date.id ] ) ) {
			prevState.assigned[ date.id ] = [];
		}
		if ( ! isAssigned( prevState.assigned, date, ticket ) ) {
			prevState.assigned[ date.id ].push( ticket );
		}
	}
	return cleanState( prevState );
};

/**
 * @function
 * @param {Object} assigned
 * @param {Object} date
 * @param {Object} ticket
 * @return {number}    		the number of date tickets in assigned
 *              			collection matching supplied ticket
 */
export const assignedCount = ( assigned, date = null, ticket = null ) => {
	if ( date && date.id && isArray( assigned[ date.id ] ) ) {
		return assigned[ date.id ].length;
	}
	let index = 0;
	let count = 0;
	if ( ticket && ticket.id ) {
		for ( const dateID in assigned ) {
			if ( isArray( assigned[ dateID ] ) ) {
				index = findIndex( assigned[ dateID ], { id: ticket.id } );
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
 * @param {Object} date
 * @param {Object} ticket
 * @param {boolean} returnIndex
 * @return {number|boolean} index for date id in removed array or
 *                        boolean if returnIndex is false
 */
export const isRemoved = ( removed, date, ticket, returnIndex = false ) => {
	let index = noIndex;
	if ( isArray( removed[ date.id ] ) ) {
		index = findIndex( removed[ date.id ], { id: ticket.id } );
	}
	return returnIndex ? index : index > noIndex;
};

/**
 * @function
 * @param {Object} removed
 * @param {Object} date
 * @param {Object} ticket
 * @param {number} index
 * @return {Object} removed
 */
export const unRemoveTicket = ( removed, date, ticket, index = noIndex ) => {
	index = index === noIndex ?
		isRemoved( removed, date, ticket, true ) :
		index;
	if ( index > noIndex ) {
		removed[ date.id ].splice( index, 1 );
		if ( isEmpty( removed[ date.id ] ) ) {
			delete removed[ date.id ];
		}
	}
	return removed;
};

/**
 * @function
 * @param {Object} prevState
 * @param {Object} date
 * @param {Object} ticket
 * @return {Object} updated state
 */
export const removeTicket = ( prevState, date, ticket ) => {
	const index = isAssigned( prevState.assigned, date, ticket, true );
	if ( index > noIndex ) {
		prevState.assigned = unAssignTicket(
			prevState.assigned,
			date,
			ticket,
			index
		);
	} else {
		if ( ! isArray( prevState.removed[ date.id ] ) ) {
			prevState.removed[ date.id ] = [];
		}
		if ( ! isRemoved( prevState.removed, date, ticket ) ) {
			prevState.removed[ date.id ].push( ticket );
		}
	}
	return cleanState( prevState );
};

/**
 * @function
 * @param {Object} removed
 * @param {Object} date
 * @param {Object} ticket
 * @return {number}    		the number of date tickets in removed
 *              			collection matching supplied ticket
 */
export const removedCount = ( removed, date = null, ticket = null ) => {
	if ( date && date.id && isArray( removed[ date.id ] ) ) {
		return removed[ date.id ].length;
	}
	let index = 0;
	let count = 0;
	if ( ticket && ticket.id ) {
		for ( const dateID in removed ) {
			if ( isArray( removed[ dateID ] ) ) {
				index = findIndex( removed[ dateID ], { id: ticket.id } );
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
 * @param {Object} date
 * @param {Object} ticket
 * @return {Object} updated state
 */
const cleanState = ( prevState ) => {
	const assigned = omitBy( prevState.assigned, isUndefined );
	const removed = omitBy( prevState.removed, isUndefined );
	return { assigned, removed };
};
