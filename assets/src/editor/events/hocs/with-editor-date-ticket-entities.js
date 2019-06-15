/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT_OBJECT = {
	ticketEntities: [],
};

/**
 * A Hoc exposing ticket entities related to the provided DateTimeEntity.
 *
 * @return {function} A higher order component.
 */
const withEditorDateTicketEntities = createHigherOrderComponent(
	withSelect(
		( select, { dateEntity } ) => {
			const { getRelatedEntities } = select( 'eventespresso/core' );
			if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
				const ticketEntities = getRelatedEntities(
					dateEntity,
					'ticket'
				);
				return { ticketEntities };
			}
			return DEFAULT_OBJECT;
		}
	),
	'withEditorDateTicketEntities'
);

export default withEditorDateTicketEntities;
