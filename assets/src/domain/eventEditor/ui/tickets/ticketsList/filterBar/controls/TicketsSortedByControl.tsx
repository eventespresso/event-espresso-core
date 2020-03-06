import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@appInputs/SelectInput';
import { SortTicketsBy } from '@edtrInterfaces/ticket/types';
import { SetSortTicketsByInterface } from '../useTicketsListFilterState/types';

interface TicketsSortedByControlProps {
	sortTicketsBy: SortTicketsBy;
	setSortTicketsBy: SetSortTicketsByInterface;
}

/**
 * filter for controlling the sorting of a list of Tickets
 *
 * @param {Function} setSortTicketsBy
 * @param {string} sortTicketsBy
 * @return {Object} rendered control
 */
const TicketsSortedByControl: React.FC<TicketsSortedByControlProps> = React.memo(
	({ setSortTicketsBy, sortTicketsBy }) => {
		return (
			<SelectInput
				label={__('sort by')}
				className='ee-ticket-list-filter-bar-order-select'
				value={sortTicketsBy}
				options={[
					{
						value: SortTicketsBy.date,
						label: __('ticket sale date'),
					},
					{
						value: SortTicketsBy.name,
						label: __('ticket name'),
					},
					{
						value: SortTicketsBy.id,
						label: __('ticket ID'),
					},
					{
						value: SortTicketsBy.order,
						label: __('custom order'),
					},
				]}
				onChange={setSortTicketsBy}
			/>
		);
	}
);

export default TicketsSortedByControl;
