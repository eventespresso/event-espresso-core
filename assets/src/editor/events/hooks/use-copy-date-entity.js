/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { cancelClickEvent } from '@eventespresso/eejs';
import { _x, sprintf } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { useEventEditorEvent, useTicketsForEventDates } from './index';

/**
 * @function
 * @param {BaseEntity} eventDate
 * @return {Function} function for copying an event date entity
 */
const useCopyDateEntity = ( eventDate ) => {
	const {
		createEntity,
		createRelations,
	} = useDispatch( 'eventespresso/core' );
	const { eventEntity } = useEventEditorEvent( eventDate.evtId );
	const { ticketEntities } = useTicketsForEventDates( [ eventDate ] );
	return useCallback( async ( click ) => {
		cancelClickEvent( click );
		if (
			! isModelEntityOfModel( eventEntity, 'event' ) ||
			! isModelEntityOfModel( eventDate, 'datetime' )
		) {
			return null;
		}

		const newEventDate = await createEntity(
			'datetime',
			eventDate.forClone
		);
		newEventDate.name = sprintf(
			_x( '%s - COPY', 'Event Date Name - COPY', 'event_espresso' ),
			newEventDate.name
		);
		if ( ! isEmpty( ticketEntities ) ) {
			createRelations(
				'datetime',
				newEventDate.id,
				'ticket',
				ticketEntities
			);
		}
		createRelations(
			'event',
			eventEntity.id,
			'datetime',
			[ newEventDate ]
		);
		return newEventDate;
	}, [ eventEntity, ticketEntities ] );
};

export default useCopyDateEntity;
