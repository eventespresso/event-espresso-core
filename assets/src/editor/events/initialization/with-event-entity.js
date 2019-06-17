/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const EMPTY_OBJECT = {};

/**
 * withEventEntity
 * returns an object containing the following:
 *    event - the event entity for the supplied eventId
 *    eventLoaded - boolean true if loading is complete
 *
 * @function
 */
const withEventEntity = createHigherOrderComponent(
	withSelect(
		( select, { eventId, editorInitialized } ) => {
			if ( eventId && ! editorInitialized ) {
				const { getEventById } = select( 'eventespresso/core' );
				const { hasFinishedResolution } = select( 'core/data' );
				const eventEntity = getEventById( eventId );
				const eventEntityLoaded = hasFinishedResolution(
					'eventespresso/core',
					'getEventById',
					[ eventId ]
				);
				if (
					eventEntityLoaded &&
					isModelEntityOfModel( eventEntity, 'event' )
				) {
					return { eventEntity, eventEntityLoaded };
				}
			}
			return EMPTY_OBJECT;
		}
	),
	'withEventEntity'
);

export default withEventEntity;
