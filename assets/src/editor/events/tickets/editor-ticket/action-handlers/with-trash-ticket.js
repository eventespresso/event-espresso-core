/**
 * External imports
 */
import { withDispatch } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const { confirm } = window;

const DEFAULT_DISPATCH = { trashTicket: () => false };

const withTrashTicket = createHigherOrderComponent(
	withDispatch( (
		dispatch,
		{ ticket },
	) => {
		const { MODEL_NAME: TICKET } = ticketModel;
		if ( ! isModelEntityOfModel( ticket, TICKET ) ) {
			return DEFAULT_DISPATCH;
		}
		const trashTicket = () => {
			if ( ! confirm(
				__(
					'Are you sure you want to delete this ticket?',
					'event_espresso'
				)
			) ) {
				return DEFAULT_DISPATCH;
			}
			const { trashEntityById } = dispatch( 'eventespresso/core' );
			trashEntityById( TICKET, ticket.id );
		};
		return { trashTicket };
	} ),
	'withTrashTicket'
);

export default withTrashTicket;
