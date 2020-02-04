/**
 * External imports
 */
import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal imports
 */
import { SortTickets } from '../../../../data/ticket/types';

interface TicketsSortedByControlProps {
	sortTicketsBy: SortTickets;
	setSortTickets: (sortTicketsBy: SortTickets) => void;
}

/**
 * filter for controlling the sorting of a list of Tickets
 *
 * @param {Function} setSortTickets
 * @param {string} sortTicketsBy
 * @return {Object} rendered control
 */
const TicketsSortedByControl: React.FC<TicketsSortedByControlProps> = ({
	setSortTickets,
	sortTicketsBy,
}): JSX.Element => {
	return React.useMemo(() => {
		return (
			<SelectControl
				label={__('sort', 'event_espresso')}
				className='ee-ticket-list-filter-bar-order-select'
				value={sortTicketsBy}
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
				onChange={setSortTickets}
			/>
		);
	}, [sortTicketsBy, setSortTickets]);
};

export default TicketsSortedByControl;
