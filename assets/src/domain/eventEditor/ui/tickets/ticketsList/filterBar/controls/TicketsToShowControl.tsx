import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@appInputs/SelectInput';
import { TicketsToShow } from '@edtrServices/filterState';

interface TicketsToShowControlProps {
	isChained?: boolean;
	ticketsToShow: TicketsToShow;
	setTicketsToShow: (ticketsToShow: TicketsToShow) => void;
}

/**
 * filter for controlling which dates display in a list of Tickets
 *
 * @param {boolean} isChained
 * @param {string} ticketsToShow
 * @param {Function} setTicketsToShow
 * @return {Object} rendered control
 */
const TicketsToShowControl: React.FC<TicketsToShowControlProps> = React.memo(
	({ isChained, setTicketsToShow, ticketsToShow }) => {
		return (
			<SelectInput
				label={__('show')}
				className='ee-ticket-list-filter-bar-show-select'
				value={ticketsToShow}
				options={[
					{
						value: TicketsToShow.above50Sold,
						label: __('tickets with 50% or more sold'),
					},
					{
						value: TicketsToShow.above75Sold,
						label: __('tickets with 75% or more sold'),
					},
					{
						value: TicketsToShow.above90Sold,
						label: __('tickets with 90% or more sold'),
					},
					{
						value: TicketsToShow.all,
						label: isChained ? __('all tickets for above dates') : __('all tickets for all dates'),
					},
					{
						value: TicketsToShow.trashedOnly,
						label: __('trashed tickets only'),
					},
					{
						value: TicketsToShow.below50Sold,
						label: __('tickets with less than 50% sold'),
					},

					{
						value: TicketsToShow.expiredOnly,
						label: __('expired tickets only'),
					},
					{
						value: TicketsToShow.nextOnSaleOrPendingOnly,
						label: __('next on sale or sale pending only'),
					},
					{
						value: TicketsToShow.onSaleAndPending,
						label: __('all on sale and sale pending'),
					},
					{
						value: TicketsToShow.onSaleOnly,
						label: __('on sale tickets only'),
					},
					{
						value: TicketsToShow.pendingOnly,
						label: __('sale pending tickets only'),
					},

					{
						value: TicketsToShow.soldOutOnly,
						label: __('sold out tickets only'),
					},
				]}
				onChange={setTicketsToShow}
			/>
		);
	}
);

export default TicketsToShowControl;
