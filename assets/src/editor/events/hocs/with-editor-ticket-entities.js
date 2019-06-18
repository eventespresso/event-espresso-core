import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

export default createHigherOrderComponent(
	withSelect( ( select ) => {
		return {
			ticketEntities: select( 'eventespresso/core' ).getTickets(),
		};
	} ),
	'withEditorTicketEntities'
);
