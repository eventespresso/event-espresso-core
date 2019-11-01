/**
 * External imports
 */
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * A hook for retrieving the an event via the supplied ID
 * if no ID is supplied, will return the first event in the store
 *
 * @param {number} eventId   event entity ID
 * @return {Object} - the event entity for the supplied ID
 *                  - boolean indicating if loading is completed
 */
const useEventEditorEvent = ( eventId = 0 ) => {
	return useSelect( ( select ) => {
		let entity;
		if ( eventId === 0 ) {
			const { getEntitiesForModel } = select( 'eventespresso/core' );
			entity = getEntitiesForModel( 'event' );
			entity = entity.hasOwnProperty( 'eventEntity' ) ?
				entity.eventEntity :
				entity;
			entity = Array.isArray( entity ) && entity[0] ?
				entity[ 0 ] :
				entity;
		} else {
			const { getEntityById } = select( 'eventespresso/core' );
			entity = getEntityById( 'event', eventId );
		}
		const loaded = isModelEntityOfModel( entity, 'event' );
		return {
			eventEntity: entity,
			eventEntityLoaded: loaded,
		};
	}, [ eventId ] );
};

export default useEventEditorEvent;
