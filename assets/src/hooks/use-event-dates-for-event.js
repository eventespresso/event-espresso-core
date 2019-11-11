/**
 * External imports.
 */
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT = { dateEntities: [], dateEntitiesLoaded: false };

/**
 * A custom react hook for retrieving the related ticket entities
 * for the given event date entities from the eventespresso/core store state.
 *
 * @param {BaseEntity} event
 * @param {boolean} eventLoaded
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */
const useEventDatesForEvent = ( event, eventLoaded = true ) => {
	return useSelect( ( select ) => {
		if ( ! (
			eventLoaded &&
			isModelEntityOfModel( event, 'event' )
		) ) {
			return DEFAULT;
		}
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const entities = getRelatedEntities( event, 'datetime' );
		const loaded = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntities',
			[ event, 'datetime' ]
		);
		return {
			dateEntities: entities,
			dateEntitiesLoaded: loaded,
		};
	}, [ event ] );
};

export default useEventDatesForEvent;
