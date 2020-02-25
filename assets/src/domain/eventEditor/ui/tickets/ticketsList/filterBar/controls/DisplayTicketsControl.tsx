/**
 * External imports
 */
import * as React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal imports
 */
import { DisplayDates } from '@edtrInterfaces/ticket/types';

interface DisplayTicketsControlProps {
	displayTicketDate: DisplayDates;
	setDisplayTicketDate: (displayDates: DisplayDates) => void;
}

/**
 * filter for controlling which dates display in a list of Tickets
 *
 * @param {string} displayTicketDate
 * @param {Function} setDisplayTicketDate
 * @return {Object} rendered control
 */
const DisplayTicketsControl: React.FC<DisplayTicketsControlProps> = ({ displayTicketDate, setDisplayTicketDate }) => {
	return React.useMemo(() => {
		return (
			<SelectControl
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
	}, [displayTicketDate, setDisplayTicketDate]);
};

export default DisplayTicketsControl;
