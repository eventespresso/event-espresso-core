/**
 * External imports
 */
import * as React from 'react';
import { SelectControl } from '@wordpress/components';

/**
 * Internal imports
 */
import { DisplayDates } from '../../../../data/ticket/types';
import { __ } from '../../../../../../application/utilities/text';

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
				label={__('display', 'event_espresso')}
				className='ee-ticket-list-filter-bar-display-select'
				value={displayTicketDate}
				options={[
					{
						value: DisplayDates.start,
						label: __('ticket sales start date only', 'event_espresso'),
					},
					{
						value: DisplayDates.end,
						label: __('ticket sales end date only', 'event_espresso'),
					},
					{
						value: DisplayDates.both,
						label: __('ticket sales start and end dates', 'event_espresso'),
					},
				]}
				onChange={setDisplayTicketDate}
			/>
		);
	}, [displayTicketDate, setDisplayTicketDate]);
};

export default DisplayTicketsControl;
