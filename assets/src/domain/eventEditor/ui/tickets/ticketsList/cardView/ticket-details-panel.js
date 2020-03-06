/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { EntityDetailsPanel } from '@eventespresso/components';
import { parseInfinity } from '@eventespresso/utils';
import { __ } from '@eventespresso/i18n';
import { InfinitySymbol } from '@eventespresso/value-objects';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import TicketRegistrationsLink from '../../../../../../../ZZZ/editor/events/tickets/editor-ticket/ticket-registrations-link';

/**
 * ticketSoldReservedCapacity
 *
 * @function
 * @param {Object} ticket model object defining the ticket
 * @return {Object}  rendered ticket details panel
 */
const TicketDetailsPanel = ({ ticket, registrationCount }) =>
	useMemo(() => {
		const details = [
			{
				id: 'ee-ticket-sold',
				label: __('sold', 'event_espresso'),
				value: ticket.sold,
			},
			{
				id: 'ee-ticket-qty',
				label: __('quantity', 'event_espresso'),
				value: <InfinitySymbol value={ticket.qty} asInt />,
				editable: {
					type: 'text',
					valueType: 'infinite',
					onChange: (qty) => {
						qty = parseInfinity(qty, true, true);
						ticket.qty = qty;
						return <InfinitySymbol value={qty} asInt />;
					},
				},
			},
			{
				id: 'ee-ticket-reserved',
				label: __('reg count', 'event_espresso'),
				value: registrationCount,
			},
			{
				id: 'ee-ticket-registrations',
				label: __('reg list', 'event_espresso'),
				value: <TicketRegistrationsLink ticketEntity={ticket} />,
			},
		];
		return <EntityDetailsPanel details={details} htmlClass='ee-editor-ticket-details-sold-rsrvd-qty-div' />;
	}, [ticket.id, ticket.qty, ticket.reserved, ticket.sold]);

TicketDetailsPanel.propTypes = {
	ticket: PropTypes.object.isRequired,
	registrationCount: PropTypes.number,
};

export default TicketDetailsPanel;
