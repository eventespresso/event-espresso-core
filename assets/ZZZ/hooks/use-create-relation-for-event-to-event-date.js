/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * This custom hook returns a function handling the dispatch event for updating
 * an event -> date relation between the event entity and date entity.
 *
 * The returned function receives the following arguments:
 *  -  event entity
 *  -  event date entity
 *
 * @return {function}  A function for updating the event date relation.
 */
const useCreateRelationForEventToEventDate = () => {
	const { createRelation } = useDispatch( 'eventespresso/core' );
	return useCallback( ( eventEntity, dateEntity ) => {
		if ( ! isModelEntityOfModel( eventEntity, 'event' ) ) {
			throw new Error(
				__(
					'Unable to create relation because an invalid Event Entity was supplied.',
					'event_espresso'
				)
			);
		}
		if ( ! isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			throw new Error(
				__(
					'Unable to create relation because an invalid Date Entity was supplied.',
					'event_espresso'
				)
			);
		}
		return createRelation(
			'event',
			eventEntity.id,
			'datetime',
			dateEntity
		);
	} );
};

export default useCreateRelationForEventToEventDate;
