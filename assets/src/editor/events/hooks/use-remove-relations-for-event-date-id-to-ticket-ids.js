/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

/**
 * Returns a function handling the dispatch event for removing relations
 * between an event date entity and one or more ticket entities.
 *
 * The returned function receives the following arguments:
 *  -  eventDateId ID for event date entity
 *  -  ticketIds array of ticket entity IDs
 *
 * @return {function}  A function for updating the ticket relation.
 */
const useRemoveRelationsForEventDateIdToTicketIds = () => {
	const { removeRelationForEntity } = useDispatch( 'eventespresso/core' );
	return useCallback( async ( eventDateId, ticketIds ) => {
		const relationsRemoved = [];
		ticketIds = Array.isArray( ticketIds ) ? ticketIds : [ ticketIds ];
		ticketIds.forEach( ( ticketId ) => {
			relationsRemoved.push(
				removeRelationForEntity(
					'datetime',
					eventDateId,
					'ticket',
					ticketId,
				)
			);
		} );
		return Promise.all( relationsRemoved );
	} );
};

export default useRemoveRelationsForEventDateIdToTicketIds;
