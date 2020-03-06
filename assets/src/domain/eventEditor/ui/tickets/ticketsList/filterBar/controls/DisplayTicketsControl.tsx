import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@appInputs/SelectInput';
import { SetDisplayTicketDateInterface } from '../useTicketsListFilterState/types';

import { DisplayDates } from '@edtrInterfaces/shared/types';

interface DisplayTicketsControlProps {
	displayTicketDate: DisplayDates;
	setDisplayTicketDate: SetDisplayTicketDateInterface;
}

/**
 * filter for controlling which dates display in a list of Tickets
 *
 * @param {string} displayTicketDate
 * @param {Function} setDisplayTicketDate
 * @return {Object} rendered control
 */
const DisplayTicketsControl: React.FC<DisplayTicketsControlProps> = React.memo(
	({ displayTicketDate, setDisplayTicketDate }) => {
		return (
			<SelectInput
				label={__('display')}
				className='ee-ticket-list-filter-bar-display-select'
				value={displayTicketDate}
				options={[
					{
						value: DisplayDates.start,
						label: __('ticket sales start date only'),
					},
					{
						value: DisplayDates.end,
						label: __('ticket sales end date only'),
					},
					{
						value: DisplayDates.both,
						label: __('ticket sales start and end dates'),
					},
				]}
				onChange={setDisplayTicketDate}
			/>
		);
	}
);

export default DisplayTicketsControl;
