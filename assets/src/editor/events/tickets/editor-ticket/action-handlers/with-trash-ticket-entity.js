/**
 * External imports
 */
import { withDispatch } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const { confirm } = window;

const DEFAULT_DISPATCH = { trashTicketEntity: () => false };

const withTrashTicketEntity = createHigherOrderComponent(
	withDispatch( (
		dispatch,
		{ ticketEntity },
	) => {
		const { MODEL_NAME: TICKET } = ticketModel;
		if ( ! isModelEntityOfModel( ticketEntity, TICKET ) ) {
			return DEFAULT_DISPATCH;
		}
		const trashTicketEntity = () => {
			if ( ! confirm(
				__(
					'Are you sure you want to delete this ticket?',
					'event_espresso'
				)
			) ) {
				return DEFAULT_DISPATCH;
			}
			const { trashEntityById } = dispatch( 'eventespresso/core' );
			trashEntityById( TICKET, ticketEntity.id );
		};
		return { trashTicketEntity };
	} ),
	'withTrashTicketEntity'
);

export default withTrashTicketEntity;
