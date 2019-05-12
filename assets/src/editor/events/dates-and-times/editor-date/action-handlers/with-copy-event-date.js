/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const withCopyEventDate = createHigherOrderComponent(
	withDispatch( (
		dispatch,
		{ event, eventDate, datetimeTickets, ticketsLoaded }
	) => {
		if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
			return { copyEventDate: () => null };
		}
		const {
			createEntity,
			createRelations,
		} = dispatch( 'eventespresso/core' );
		const copyEventDate = async () => {
			const newEventDate = await createEntity(
				'datetime',
				eventDate.forClone
			);
			if ( ticketsLoaded && ! isEmpty( datetimeTickets ) ) {
				createRelations(
					'datetime',
					newEventDate.id,
					'tickets',
					datetimeTickets
				);
			}
			createRelations(
				'event',
				event.id,
				'datetimes',
				[ newEventDate ]
			);
			return newEventDate;
		};
		return { copyEventDate };
	} ),
	'withCopyEventDate'
);

export default withCopyEventDate;
