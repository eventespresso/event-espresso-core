import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT_OBJECT = {
	venueEntity: null,
	venueEntityLoaded: false,
};

/**
 * @typedef { Object }         VenueResponse
 * @property {BaseEntity|null} venueEntity       The instance of the venue or
 *                                               null.
 * @property {boolean}         venueEntityLoaded Whether the venue has been
 *                                               loaded or not.
 */

/**
 * A custom hook for retrieving the venue related to the given event
 *
 * @param {BaseEntity} eventEntity  An instance of an event entity.
 *
 * @return {VenueResponse} An object containing details about the retrieved
 *                         related venue to the event.
 */
const useEventVenueEntity = ( eventEntity ) => {
	const { venueEntity, venueEntityLoaded } = useSelect( ( select ) => {
		const { getRelatedEntities, hasFinishedResolution } = select(
			'eventespresso/core'
		);
		if ( isModelEntityOfModel( eventEntity, 'event' ) ) {
			let venue = getRelatedEntities(
				eventEntity,
				'venue'
			);
			const venueLoaded = hasFinishedResolution(
				'getRelatedEntities',
				[ eventEntity, 'venue' ]
			);
			if ( venueLoaded ) {
				venue = Array.isArray( venue ) && venue[ 0 ] &&
				isModelEntityOfModel( venue[ 0 ], 'venue' ) ?
					venue[ 0 ] :
					null;
				return {
					venueEntity: venue,
					venueEntityLoaded: venueLoaded,
				};
			}
		}
		return DEFAULT_OBJECT;
	}, [ eventEntity ] );
	return { venueEntity, venueEntityLoaded };
};

export default useEventVenueEntity;
