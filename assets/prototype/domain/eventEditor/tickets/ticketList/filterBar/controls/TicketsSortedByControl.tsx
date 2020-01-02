/**
 * External imports
 */
import { SelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal imports
 */
import { SortTickets } from '../../../../../eventEditor/data/ticket/types';

/**
 * filter for controlling the sorting of a list of Tickets
 *
 * @param {Function} setTicketsSortedBy
 * @param {string} ticketsSortedBy
 * @return {Object} rendered control
 */
const TicketsSortedByControl = ({ setTicketsSortedBy, ticketsSortedBy }) => {
	return useMemo(() => {
		return (
			<SelectControl
				label={__('sort', 'event_espresso')}
				className='ee-ticket-list-filter-bar-order-select'
				value={ticketsSortedBy}
				options={[
					{
						value: SortTickets.chronologically,
						label: __('chronologically', 'event_espresso'),
					},
					{
						value: SortTickets.byName,
						label: __('by ticket name', 'event_espresso'),
					},
					{
						value: SortTickets.byId,
						label: __('by ticket ID', 'event_espresso'),
					},
					{
						value: SortTickets.byOrder,
						label: __('by custom order', 'event_espresso'),
					},
				]}
				onChange={setTicketsSortedBy}
			/>
		);
	}, [ticketsSortedBy, setTicketsSortedBy]);
};

export default TicketsSortedByControl;
