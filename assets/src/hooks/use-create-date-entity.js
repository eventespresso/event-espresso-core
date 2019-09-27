/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { ServerDateTime, Duration } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import useCreateRelationForEventToEventDate
	from './use-create-relation-for-event-to-event-date';

const useCreateDateEntity = ( event, cacheNewDate ) => {
	const { createEntity } = useDispatch( 'eventespresso/core' );
	const updateEventDateRelation = useCreateRelationForEventToEventDate();
	return useCallback(
		async () => {
			const nowJs = new Date();
			nowJs.setHours(
				nowJs.getHours(),
				Math.ceil( nowJs.getMinutes() / 15 ) * 15,
				0,
				0
			);
			const now = ServerDateTime.fromJSDate( nowJs );
			const newDate = await createEntity(
				'datetime',
				{
					EVT_ID: event.id,
					DTT_name: '',
					DTT_description: '',
					DTT_EVT_start: now.plus(
						Duration.fromObject( { days: 30 } )
					),
					DTT_EVT_end: now.plus(
						Duration.fromObject( { days: 30, hours: 2 } )
					),
					DTT_reg_limit: -1,
					DTT_sold: 0,
					DTT_reserved: 0,
					DTT_order: 0,
					DTT_parent: 0,
					DTT_deleted: false,
				}
			);
			await updateEventDateRelation( event, newDate );
			cacheNewDate( newDate );
		},
		[ event, cacheNewDate ]
	);
};

export default useCreateDateEntity;
