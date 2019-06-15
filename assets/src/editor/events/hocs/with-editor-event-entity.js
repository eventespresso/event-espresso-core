import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT_OBJECT = {
	eventEntity: null,
};

export default createHigherOrderComponent(
	withSelect( ( select, { eventEntity } ) => {
		// if we already have an event entity, just pass it through
		if ( isModelEntityOfModel( eventEntity, 'event' ) ) {
			return { eventEntity };
		}
		const events = select( 'eventespresso/core' ).getEvents();
		return events.length > 0 ?
			{
				eventEntity: events.slice( -1 ).pop(),
			} :
			DEFAULT_OBJECT;
	} ),
	'withEditorEventEntity'
);
