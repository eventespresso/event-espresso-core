/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

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
			const newDate = await createEntity( 'datetime', {} );
			await updateEventDateRelation( event, newDate );
			cacheNewDate( newDate );
		},
		[ event, cacheNewDate ]
	);
};

export default useCreateDateEntity;
