/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT_OBJECT = {
	dateEntities: [],
};

/**
 * A HOC exposing date entities related to the provided eventEntity.
 *
 * @return {function} A higher order component.
 */
const withEditorEventDateEntities = createHigherOrderComponent(
	withSelect(
		( select, { eventEntity } ) => {
			const { getRelatedEntities } = select( 'eventespresso/core' );
			if ( isModelEntityOfModel( eventEntity, 'event' ) ) {
				const dateEntities = getRelatedEntities(
					eventEntity,
					'datetime'
				);
				return { dateEntities };
			}
			return DEFAULT_OBJECT;
		}
	),
	'withEditorEventDateEntities'
);

export default withEditorEventDateEntities;
