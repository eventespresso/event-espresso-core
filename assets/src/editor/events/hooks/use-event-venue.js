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
 * @param {BaseEntity} event  An instance of an event entity.
 * @param {boolean} eventLoaded
 * @return {Object} - the venue entity for the provided event
 *                  - boolean indicating if loading is completed
 */
const useEventVenue = ( event, eventLoaded = true ) => {
	return useSelect( ( select ) => {
		if ( ! (
			eventLoaded &&
			isModelEntityOfModel( event, 'event' )
		) ) {
			return DEFAULT;
		}
		const {
			getRelatedEntities,
			hasFinishedResolution,
		} = select( 'eventespresso/core' );
		let entity = getRelatedEntities( event, 'venue' );
		const loaded = hasFinishedResolution(
			'getRelatedEntities',
			[ event, 'venue' ]
		);
		entity = Array.isArray( entity ) && entity[ 0 ] &&
		isModelEntityOfModel( entity[ 0 ], 'venue' ) ?
			entity[ 0 ] :
			null;
		return {
			venueEntity: entity,
			venueEntityLoaded: loaded,
		};
	}, [ event, eventLoaded ] );
};

export default useEventVenue;
