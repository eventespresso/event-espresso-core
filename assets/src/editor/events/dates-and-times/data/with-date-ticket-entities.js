/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * A Hoc exposing ticket entities related to the provided DateTimeEntity.
 *
 * @return {function} A higher order component.
 */
export const withDateTicketEntities = createHigherOrderComponent(
	withSelect(
		( select, { dateEntity } ) => {
			const { getRelatedEntities } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
				const dateTicketEntities = getRelatedEntities(
					dateEntity,
					'tickets'
				);
				const dateTicketEntitiesLoaded = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntities',
					[ dateEntity, 'tickets' ]
				);
				return { dateTicketEntities, dateTicketEntitiesLoaded };
			}
			return {};
		}
	),
	'withDateTicketEntities'
);
