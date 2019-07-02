import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * A hook for retrieving the existing event stored in state (or returning
 * a passed in value that is already an event entity.
 *
 * Why a passed through value?  There may be cases where this hook is used in
 * a component where `eventEntity` is in the props so there's no need to retrieve
 * from the store state. One of the rules of react hooks is that they must always
 * be in the same order and execute.  So that means you can't put a hook inside
 * a conditional.
 *
 * @param {BaseEntity|null} existingEventEntity  Optionally an existing event
 * entity that will be returned if valid.
 * @return {BaseEntity|null}  An instance of the Event or null if not available
 */
const useEditorEventEntity = ( existingEventEntity = null ) => {
	const eventEntity = useSelect( ( select ) => {
		// if already have an event entity, then return it.
		if ( isModelEntityOfModel( existingEventEntity, 'event' ) ) {
			return existingEventEntity;
		}
		const events = select( 'eventespresso/core' ).getEvents();
		return events.length > 0 ?
			events.slice( -1 ).pop() :
			null;
	}, [ existingEventEntity ] );
	return eventEntity;
};

export default useEditorEventEntity;
