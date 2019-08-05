/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { useEventEditorEvent, useTicketsForEventDates } from '../../../hooks';

const nullFunc = () => null;

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
	const { event } = useEventEditorEvent( eventDate.evtId );
	const { ticketEntities } = useTicketsForEventDates( [ eventDate ] );
	return useCallback( () => {
		if (
			! isModelEntityOfModel( event, 'event' ) ||
			! isModelEntityOfModel( eventDate, 'datetime' )
		) {
			return nullFunc;
		}
		return async () => {
			const newEventDate = await createEntity(
				'datetime',
				eventDate.forClone
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
				event.id,
				'datetime',
				[ newEventDate ]
			);
			return newEventDate;
		};
	}, [ event, ticketEntities ] );
};

export default useCopyDateEntity;
