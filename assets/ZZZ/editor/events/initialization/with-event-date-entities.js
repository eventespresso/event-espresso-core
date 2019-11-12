/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const DEFAULT_OBJECT = {
	dateEntities: [],
	dateEntitiesLoaded: false,
};

/**
 * withEventDateEntities
 * returns an object containing the following:
 *    dateEntities - an array of datetime entities for the supplied event
 *    dateEntitiesLoaded - boolean true if loading is complete
 *
 * @function
 */
const withEventDateEntities = createHigherOrderComponent(
	withSelect(
		( select, { eventEntity, eventEntityLoaded, editorInitialized } ) => {
			if (
				! editorInitialized &&
				eventEntityLoaded &&
				isModelEntityOfModel( eventEntity, 'event' )
			) {
				const { getRelatedEntities } = select( 'eventespresso/core' );
				const { hasFinishedResolution } = select( 'core/data' );
				const dateEntities = getRelatedEntities( eventEntity, 'datetime' );
				const dateEntitiesLoaded = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntities',
					[ eventEntity, 'datetime' ]
				);
				if ( dateEntitiesLoaded ) {
					return { dateEntities, dateEntitiesLoaded };
				}
			}
			return DEFAULT_OBJECT;
		}
	),
	'withEventDateEntities'
);

export default withEventDateEntities;
