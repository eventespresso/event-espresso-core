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
 * @param {BaseEntity[]} event  an event entity
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */
const useEventDatesForEvent = ( event ) => {
	return useSelect( ( select ) => {
		if ( ! isModelEntityOfModel( event, 'event' ) ) {
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
