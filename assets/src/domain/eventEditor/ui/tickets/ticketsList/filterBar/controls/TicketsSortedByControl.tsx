/**
 * External imports
 */
import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal imports
 */
import { SortTicketsBy } from '../../../../../../../domain/eventEditor/interfaces/ticket/types';

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
				label={__('sort')}
				className='ee-ticket-list-filter-bar-order-select'
				value={sortTicketsBy}
				options={[
					{
						value: SortTicketsBy.date,
						label: __('by ticket sale date'),
					},
					{
						value: SortTicketsBy.name,
						label: __('by ticket name'),
					},
					{
						value: SortTicketsBy.id,
						label: __('by ticket ID'),
					},
					{
						value: SortTicketsBy.order,
						label: __('by custom order'),
					},
				]}
				onChange={setSortTicketsBy}
			/>
		);
	}, [sortTicketsBy, setSortTicketsBy]);
};

export default TicketsSortedByControl;
