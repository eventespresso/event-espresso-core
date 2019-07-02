import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';
import useEditorEventEntity from './use-editor-event-entity';
import { dateTimeModel, eventModel } from '@eventespresso/model';
import { __ } from '@eventespresso/i18n';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { MODEL_NAME: EVENT } = eventModel;

/**
 * This custom hook returns a function handling the dispatch event for updating
 * an event -> date relation between the event entity and date entity.
 *
 * The returned function receives one argument and expects a BaseEntity instance
 * of the datetime model.
 *
 * The event entity will be retrieved from store state if not provided.
 *
 * @param {BaseEntity|null} eventEntity Optional. If provided will be used
 * instead of retrieving from store state.
 *
 * @return {function}  A function for updating the event date relation.
 */
const useEditorUpdateEventDateRelation = ( eventEntity = null ) => {
	eventEntity = useEditorEventEntity( eventEntity );
	const { createRelation } = useDispatch( 'eventespresso/core' );
	const updateEventDateRelation = useCallback( ( dateEntity ) => {
		if ( ! isModelEntityOfModel( eventEntity, EVENT ) ) {
			throw new Error(
				__(
					'Unable to process the Event Date Entity form because an invalid Event Entity was supplied. ',
					'event_espresso'
				)
			);
		}
		if ( ! isModelEntityOfModel( dateEntity, DATETIME ) ) {
			throw new Error(
				__(
					'Unable to process the Event Date Entity form because an invalid Date Entity was supplied. ',
					'event_espresso'
				)
			);
		}
		createRelation(
			EVENT,
			eventEntity.id,
			DATETIME,
			dateEntity
		);
	}, [ eventEntity ] );
	return updateEventDateRelation;
};

export default useEditorUpdateEventDateRelation;
