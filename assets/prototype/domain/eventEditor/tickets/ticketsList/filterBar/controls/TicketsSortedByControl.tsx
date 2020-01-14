/**
 * External imports
 */
import React from 'react';
import { SelectControl } from '@wordpress/components';

/**
 * Internal imports
 */
import { __ } from '../../../../../../application/utilities/text';
import { SortTicketsBy } from '../../../../data/ticket/types';

interface TicketsSortedByControlProps {
	sortTicketsBy: SortTicketsBy;
	setSortTicketsBy: (sortTicketsBy: SortTicketsBy) => void;
}

/**
 * filter for controlling the sorting of a list of Tickets
 *
 * @param {Function} setSortTicketsBy
 * @param {string} sortTicketsBy
 * @return {Object} rendered control
 */
const TicketsSortedByControl: React.FC<TicketsSortedByControlProps> = ({
	setSortTicketsBy,
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
						value: SortTicketsBy.chronologically,
						label: __('chronologically', 'event_espresso'),
					},
					{
						value: SortTicketsBy.byName,
						label: __('by ticket name', 'event_espresso'),
					},
					{
						value: SortTicketsBy.byId,
						label: __('by ticket ID', 'event_espresso'),
					},
					{
						value: SortTicketsBy.byOrder,
						label: __('by custom order', 'event_espresso'),
					},
				]}
				onChange={setSortTicketsBy}
			/>
		);
	}, [sortTicketsBy, setSortTicketsBy]);
};

export default TicketsSortedByControl;
