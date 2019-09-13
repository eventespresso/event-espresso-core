/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { EntityDetailsPanel } from '@eventespresso/components';
import { parseInfinity } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';
import { InfinitySymbol } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
// import TicketRegistrationsLink from '../ticket-registrations-link';

/**
 * ticketSoldReservedCapacity
 *
 * @function
 * @param {Object} ticket model object defining the ticket
 * @return {Object}  rendered ticket details panel
 */
const TicketDetailsPanel = ( { ticket } ) => useMemo(
	() => {
		const details = [
			{
				id: 'ee-ticket-sold',
				label: __( 'sold', 'event_espresso' ),
				value: ticket.sold,
			},
			{
				id: 'ee-ticket-reserved',
				label: __( 'reserved', 'event_espresso' ),
				value: ticket.reserved,
			},
			{
				id: 'ee-ticket-qty',
				label: __( 'quantity', 'event_espresso' ),
				value: <InfinitySymbol value={ ticket.qty } asInt />,
				editable: {
					type: 'text',
					valueType: 'infinite',
					onChange: ( qty ) => {
						qty = parseInfinity( qty, true, true );
						ticket.qty = qty;
						return <InfinitySymbol value={ qty } asInt />;
					},
				},
			},
			{
				id: 'ee-ticket-registrants',
				label: __( 'registrants', 'event_espresso' ),
				// should be count of related registrations
				// supplied by TicketRegistrationsLink
				value: ticket.sold,
			},
		];
		return <EntityDetailsPanel
			details={ details }
			htmlClass="ee-editor-ticket-details-sold-rsrvd-qty-div"
		/>;
	},
	[
		ticket.id,
		ticket.qty,
		ticket.reserved,
		ticket.sold,
	]
);

export default TicketDetailsPanel;
