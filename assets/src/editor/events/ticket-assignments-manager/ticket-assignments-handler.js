/**
 * External imports
 */
import { filter, find, findIndex } from 'lodash';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const noIndex = -1;

const { MODEL_NAME: DATETIME } = dateTimeModel;

/**
 * @function
 * @param {Array} dates
 * @param {Object} assigned
 * @param {Function} addTickets
 * @param {Object} removed
 * @param {Function} removeTickets
 * @return {Promise} resolves to true if updates occurred
 */
export const processChanges = async (
	dates,
	assigned,
	addTickets,
	removed,
	removeTickets
) => {
	const relationUpdates = [];
	for ( let dateID in removed ) {
		dateID = parseInt( dateID );
		if ( removed.hasOwnProperty( dateID ) ) {
			const date = find( dates, { id: dateID } );
			if ( isModelEntityOfModel( date, DATETIME ) ) {
				const ticketsToRemove = removed[ dateID ];
				if ( Array.isArray( ticketsToRemove ) ) {
					relationUpdates.push(
						removeTickets( date, ticketsToRemove )
					);
				}
			}
		}
	}
	for ( let dateID in assigned ) {
		dateID = parseInt( dateID );
		if ( assigned.hasOwnProperty( dateID ) ) {
			const date = find( dates, { id: dateID } );
			if ( isModelEntityOfModel( date, DATETIME ) ) {
				const ticketsToAssign = assigned[ dateID ];
				if ( Array.isArray( ticketsToAssign ) ) {
					relationUpdates.push(
						addTickets( date, ticketsToAssign )
					);
				}
			}
		}
	}
	return Promise.all( relationUpdates ).then( ( updates ) => {
		const wasUpdated = filter( updates, ( updated ) => {
			return ! ! updated;
		} );
		return wasUpdated.length > 0;
	} );
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
	if ( Array.isArray( assigned[ date.id ] ) ) {
		index = findIndex( assigned[ date.id ], { id: ticket.id } );
	}
	return returnIndex ? index : index > noIndex;
};

/**
 * @function
 * @param {Object} assigned
 * @param {Object} date
 * @param {Object} ticket
 * @return {Object} assigned
 */
export const unAssignTicket = ( assigned, date, ticket ) => {
	const index = isAssigned( assigned, date, ticket, true );
	if ( index > noIndex ) {
		delete assigned[ date.id ][ index ];
	}
	return assigned;
};

/**
 * @function
 * @param {Object} prevState
 * @param {Object} date
 * @param {Object} ticket
 * @return {Object} updated state
 */
export const assignTicket = ( prevState, date, ticket ) => {
	if ( ! Array.isArray( prevState.assigned[ date.id ] ) ) {
		prevState.assigned[ date.id ] = [];
	}
	if ( ! isAssigned( prevState.assigned, date, ticket ) ) {
		prevState.assigned[ date.id ].push( ticket );
	}
	prevState.removed = unRemoveTicket(
		prevState.removed,
		date,
		ticket
	);
	return {
		assigned: prevState.assigned,
		removed: prevState.removed,
	};
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
	if ( Array.isArray( removed[ date.id ] ) ) {
		index = findIndex( removed[ date.id ], { id: ticket.id } );
	}
	return returnIndex ? index : index > noIndex;
};

/**
 * @function
 * @param {Object} removed
 * @param {Object} date
 * @param {Object} ticket
 * @return {Object} removed
 */
export const unRemoveTicket = ( removed, date, ticket ) => {
	const index = isRemoved( removed, date, ticket, true );
	if ( index > noIndex ) {
		delete removed[ date.id ][ index ];
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
	if ( ! Array.isArray( prevState.removed[ date.id ] ) ) {
		prevState.removed[ date.id ] = [];
	}
	if ( ! isRemoved( prevState.removed, date, ticket ) ) {
		prevState.removed[ date.id ].push( ticket );
	}
	prevState.assigned = unAssignTicket(
		prevState.assigned,
		date,
		ticket
	);
	return {
		assigned: prevState.assigned,
		removed: prevState.removed,
	};
};
