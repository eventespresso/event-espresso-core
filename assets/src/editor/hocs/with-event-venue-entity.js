import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT_OBJECT = {
	venueEntity: null,
	venueEntityLoaded: false,
};

/**
 * withEventVenueEntity
 * returns an object containing the following:
 *    venueEntity - the Venue Entity for the provided Event Entity
 *    venueEntityLoaded - boolean true if loading is complete
 *
 * @function
 */
export default createHigherOrderComponent(
	withSelect( ( select, { eventEntity } ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		if ( isModelEntityOfModel( eventEntity, 'event' ) ) {
			let venueEntity = getRelatedEntities(
				eventEntity,
				'venue'
			);
			const venueEntityLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ eventEntity, 'venue' ]
			);
			if ( venueEntityLoaded ) {
				venueEntity = Array.isArray( venueEntity ) && venueEntity[ 0 ] &&
				isModelEntityOfModel( venueEntity[ 0 ], 'venue' ) ?
					venueEntity[ 0 ] :
					null;
				return {
					venueEntity,
					venueEntityLoaded,
				};
			}
		}
		return DEFAULT_OBJECT;
	} ),
	'withEventVenueEntity'
);
