/**
 * External imports
 */
import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal imports
 */
import { ShowTickets } from '../../../../../interfaces/ticket/types';

interface ShowDatesControlProps {
	isChained?: boolean;
	showTickets: ShowTickets;
	setShowTickets: (showTickets: ShowTickets) => void;
}

/**
 * filter for controlling which dates display in a list of Tickets
 *
 * @param {boolean} isChained
 * @param {string} showTickets
 * @param {Function} setShowTickets
 * @return {Object} rendered control
 */
const ShowTicketsControl: React.FC<ShowDatesControlProps> = ({ isChained, setShowTickets, showTickets }) => {
	return React.useMemo(() => {
		return (
			<SelectControl
				label={__('show')}
				className='ee-ticket-list-filter-bar-show-select'
				value={showTickets}
				options={[
					{
						value: ShowTickets.above50Sold,
						label: __('tickets with 50% or more sold'),
					},
					{
						value: ShowTickets.above75Sold,
						label: __('tickets with 75% or more sold'),
					},
					{
						value: ShowTickets.above90Sold,
						label: __('tickets with 90% or more sold'),
					},
					{
						value: ShowTickets.all,
						label: isChained ? __('all tickets for above dates') : __('all tickets for all dates'),
					},
					{
						value: ShowTickets.trashedOnly,
						label: __('trashed tickets only'),
					},
					{
						value: ShowTickets.below50Sold,
						label: __('tickets with less than 50% sold'),
					},

					{
						value: ShowTickets.expiredOnly,
						label: __('expired tickets only'),
					},
					{
						value: ShowTickets.nextOnSaleOrPendingOnly,
						label: __('next on sale or sale pending only'),
					},
					{
						value: ShowTickets.onSaleAndPending,
						label: __('all on sale and sale pending'),
					},
					{
						value: ShowTickets.onSaleOnly,
						label: __('on sale tickets only'),
					},
					{
						value: ShowTickets.pendingOnly,
						label: __('sale pending tickets only'),
					},

					{
						value: ShowTickets.soldOutOnly,
						label: __('sold out tickets only'),
					},
				]}
				onChange={setShowTickets}
			/>
		);
	}, [isChained, showTickets, setShowTickets]);
};

export default ShowTicketsControl;
