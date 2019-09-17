/**
 * External imports.
 */
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import warning from 'warning';

const DEFAULT = {
	tickets: [],
	ticketsLoaded: false,
};

/**
 * A custom react hook for retrieving the related ticket entities for the given
 * date entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} eventDate  A datetime BaseEntity instance.
 * @return {Object} - an array of tickets
 *                  - boolean indicating if loading is completed
 */
const useEventDateTickets = ( eventDate ) => {
	return useSelect( ( select ) => {
		if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
			warning(
				false,
				'The provided value is not a valid datetime entity.'
			);
			return DEFAULT;
		}
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const tickets = getRelatedEntities( eventDate, 'ticket' );
		const ticketsLoaded = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntities',
			[ eventDate, 'ticket' ]
		);
		return {
			tickets,
			ticketsLoaded,
		};
	}, [ eventDate ] );
};

export default useEventDateTickets;
