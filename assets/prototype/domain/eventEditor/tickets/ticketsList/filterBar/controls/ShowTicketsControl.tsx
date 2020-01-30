/**
 * External imports
 */
import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n'; // @todo: replace with '@eventespresso/i18n'

/**
 * Internal imports
 */
import { ShowTickets } from '../../../../data/ticket/types';

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
const ShowTicketsControl: React.FC<ShowDatesControlProps> = ({
	isChained,
	setShowTickets,
	showTickets,
}): JSX.Element => {
	return React.useMemo(() => {
		return (
			<SelectControl
				label={__('show', 'event_espresso')}
				className='ee-ticket-list-filter-bar-show-select'
				value={showTickets}
				options={[
					{
						value: ShowTickets.above50Sold,
						label: __('tickets with 50% or more sold', 'event_espresso'),
					},
					{
						value: ShowTickets.above75Sold,
						label: __('tickets with 75% or more sold', 'event_espresso'),
					},
					{
						value: ShowTickets.above90Sold,
						label: __('tickets with 90% or more sold', 'event_espresso'),
					},
					{
						value: ShowTickets.all,
						label: isChained
							? __('all tickets for above dates', 'event_espresso')
							: __('all tickets for all dates', 'event_espresso'),
					},
					{
						value: ShowTickets.trashedOnly,
						label: __('trashed tickets only', 'event_espresso'),
					},
					{
						value: ShowTickets.below50Sold,
						label: __('tickets with less than 50% sold', 'event_espresso'),
					},

					{
						value: ShowTickets.expiredOnly,
						label: __('expired tickets only', 'event_espresso'),
					},
					{
						value: ShowTickets.nextOnSaleOrPendingOnly,
						label: __('next on sale or sale pending only', 'event_espresso'),
					},
					{
						value: ShowTickets.onSaleAndPending,
						label: __('all on sale and sale pending', 'event_espresso'),
					},
					{
						value: ShowTickets.onSaleOnly,
						label: __('on sale tickets only', 'event_espresso'),
					},
					{
						value: ShowTickets.pendingOnly,
						label: __('sale pending tickets only', 'event_espresso'),
					},

					{
						value: ShowTickets.soldOutOnly,
						label: __('sold out tickets only', 'event_espresso'),
					},
				]}
				onChange={setShowTickets}
			/>
		);
	}, [isChained, showTickets, setShowTickets]);
};

export default ShowTicketsControl;
