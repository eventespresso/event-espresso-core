/**
 * External imports.
 */
import warning from 'warning';
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT = {
	event: [],
	eventLoaded: false,
};

/**
 * A custom react hook for retrieving the related event entity
 * for the given date entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} eventDate  an event date entity
 * @return {Object} - the event for the supplied event date
 *                  - boolean indicating if loading is completed
 */
const useEventDateEvent = ( eventDate ) => {
	return useSelect( ( select ) => {
		if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
			warning(
				false,
				'The provided value is not a valid datetime entity.'
			);
			return DEFAULT;
		}
		const {
			getRelatedEntities,
			hasFinishedResolution,
		} = select( 'eventespresso/core' );
		let event = getRelatedEntities( eventDate, 'event' );
		const eventLoaded = hasFinishedResolution(
			'getRelatedEntities',
			[ eventDate, 'event' ]
		);
		if ( eventLoaded ) {
			event = Array.isArray( event ) && event[ 0 ] &&
			isModelEntityOfModel( event[ 0 ], 'event' ) ?
				event[ 0 ] :
				null;
			return {
				event,
				eventLoaded,
			};
		}
		return DEFAULT;
	}, [ eventDate ] );
};

export default useEventDateEvent;
