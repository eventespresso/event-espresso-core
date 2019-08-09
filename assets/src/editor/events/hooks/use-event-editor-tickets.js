/**
 * External imports
 */
import { useSelect } from '@wordpress/data';

/**
 * A hook for retrieving all the ticket entities
 * currently in the eventespresso/core data store.
 *
 * @return {Object} - an array of tickets
 *                  - boolean indicating if loading is completed
 */
const useEventEditorTickets = () => {
	return useSelect( ( select ) => {
		const {
			getEntitiesForModel,
			hasFinishedResolution,
		} = select( 'eventespresso/core' );
		const tickets = getEntitiesForModel( 'ticket' );
		const ticketsLoaded = hasFinishedResolution(
			'eventespresso/core',
			'getEntitiesForModel',
			[ 'ticket' ]
		);
		return {
			tickets,
			ticketsLoaded,
		};
	}, [] );
};

export default useEventEditorTickets;
