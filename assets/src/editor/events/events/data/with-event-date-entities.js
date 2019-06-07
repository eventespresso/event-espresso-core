/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const EMPTY_OBJECT = {};

/**
 * withEventDateEntities
 * returns an object containing the following:
 *    dateEntities - an array of datetime entities for the supplied event
 *    dateEntitiesLoaded - boolean true if loading is complete
 *
 * !!! IMPORTANT !!!
 * ONLY USE THIS AFTER THE CALL TO hasFinishedResolution() in the
 * withEvent() DATA HOC has completed and resolved true
 *
 * @function
 */
const withEventDateEntities = createHigherOrderComponent(
	withSelect(
		( select, { eventEntity, eventEntityLoaded} ) => {
			if (
				eventEntityLoaded &&
				isModelEntityOfModel( eventEntity, 'event' )
			) {
				const { getRelatedEntities } = select( 'eventespresso/core' );
				const { hasFinishedResolution } = select( 'core/data' );
				const dateEntities = getRelatedEntities( eventEntity, 'datetimes' );
				const dateEntitiesLoaded = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntities',
					[ eventEntity, 'datetimes' ]
				);
				if ( dateEntitiesLoaded ) {
					return { dateEntities, dateEntitiesLoaded };
				}
			}
			return EMPTY_OBJECT;
		}
	),
	'withEventDateEntities'
);

export default withEventDateEntities;
