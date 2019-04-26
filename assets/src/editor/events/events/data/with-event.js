/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const EMPTY_OBJECT = {};

export const withEvent = withSelect(
	( select, ownProps ) => {
		const eventId = ownProps.eventId;
		if ( eventId ) {
			const { getEventById } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			const event = getEventById( eventId );
			const eventLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getEventById',
				[ ownProps.eventId ]
			);
			if ( eventLoaded && isModelEntityOfModel( event, 'event' ) ) {
				return { event, eventLoaded };
			}
		}
		return EMPTY_OBJECT;
	}
);
