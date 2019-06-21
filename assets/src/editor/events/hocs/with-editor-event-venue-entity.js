import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT_OBJECT = {
	venueEntity: null,
};

export default createHigherOrderComponent(
	withSelect( ( select, { eventEntity } ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		if ( isModelEntityOfModel( eventEntity, 'event' ) ) {
			const venueEntity = getRelatedEntities(
				eventEntity,
				'venue'
			);
			return Array.isArray( venueEntity ) && venueEntity[ 0 ] &&
				isModelEntityOfModel( venueEntity[ 0 ], 'venue' ) ?
				{ venueEntity: venueEntity[ 0 ] } :
				DEFAULT_OBJECT;
		}
		return DEFAULT_OBJECT;
	} ),
	'withEditorEventVenueEntity'
);
