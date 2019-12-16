/**
 * External imports
 */
import { SelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * filter for controlling which dates display in a list of Tickets
 *
 * @param {boolean} isChained
 * @param {string} showTickets
 * @param {Function} setShowTickets
 * @return {Object} rendered control
 */
const ShowTicketsControl = ({ isChained, setShowTickets, showTickets }) => {
	return useMemo(() => {
		return (
			<SelectControl
				label={__('show', 'event_espresso')}
				className='ee-ticket-list-filter-bar-show-select'
				value={showTickets}
				options={[
					{
						value: 'all',
						label: isChained
							? __('all tickets for above dates', 'event_espresso')
							: __('all tickets for all dates', 'event_espresso'),
					},
					{
						value: 'on-sale-and-pending',
						label: __('all on sale and sale pending', 'event_espresso'),
					},
					{
						value: 'on-sale-only',
						label: __('on sale tickets only', 'event_espresso'),
					},
					{
						value: 'pending-only',
						label: __('sale pending tickets only', 'event_espresso'),
					},
					{
						value: 'next-on-sale-or-pending-only',
						label: __('next on sale or sale pending only', 'event_espresso'),
					},
					{
						value: 'sold-out-only',
						label: __('sold out tickets only', 'event_espresso'),
					},
					{
						value: 'above-90-sold',
						label: __('tickets with 90% or more sold', 'event_espresso'),
					},
					{
						value: 'above-75-sold',
						label: __('tickets with 75% or more sold', 'event_espresso'),
					},
					{
						value: 'above-50-sold',
						label: __('tickets with 50% or more sold', 'event_espresso'),
					},
					{
						value: 'below-50-sold',
						label: __('tickets with less than 50% sold', 'event_espresso'),
					},
					{
						value: 'expired-only',
						label: __('expired tickets only', 'event_espresso'),
					},
					{
						value: 'archived-only',
						label: __('archived tickets only', 'event_espresso'),
					},
				]}
				onChange={setShowTickets}
			/>
		);
	}, [isChained, showTickets, setShowTickets]);
};

export default ShowTicketsControl;
