/**
 * External imports
 */
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT = {
	venueEntity: null,
	venueEntityLoaded: false,
};

/**
 * A custom hook for retrieving the venue related to the given event
 *
 * @param {BaseEntity} eventEntity  An instance of an event entity.
 * @return {Object} - the venue entity for the provided event
 *                  - boolean indicating if loading is completed
 */
const useEventVenue = ( eventEntity ) => {
	return useSelect( ( select ) => {
		if ( ! isModelEntityOfModel( eventEntity, 'event' ) ) {
			return DEFAULT;
		}
		const {
			getRelatedEntities,
			hasFinishedResolution,
		} = select( 'eventespresso/core' );
		let entity = getRelatedEntities( eventEntity, 'venue' );
		const loaded = hasFinishedResolution(
			'getRelatedEntities',
			[ eventEntity, 'venue' ]
		);
		entity = Array.isArray( entity ) && entity[ 0 ] &&
		isModelEntityOfModel( entity[ 0 ], 'venue' ) ?
			entity[ 0 ] :
			null;
		return {
			venueEntity: entity,
			venueEntityLoaded: loaded,
		};
	}, [ eventEntity ] );
};

export default useEventVenue;
