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
 * @return {Function}  A function for updating the ticket relation.
 */
const useRemoveRelationsForEventDateIdToTicketIds = () => {
	const { removeRelationForEntity } = useDispatch( 'eventespresso/core' );
	return useCallback( ( eventDateId, ticketIds ) => {
		return new Promise( ( resolve ) => {
			ticketIds.forEach( async ( ticketId ) => {
				await removeRelationForEntity(
					'datetime',
					eventDateId,
					'ticket',
					ticketId,
				);
			} );
			resolve( true );
		} );
	} );
};

export default useRemoveRelationsForEventDateIdToTicketIds;
