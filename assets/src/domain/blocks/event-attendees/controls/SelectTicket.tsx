import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import useTickets from '../hooks/useTickets';

interface SelectTicketProps {
	datetime: string;
	setTicket?: (ticket: string) => void;
	ticket: string;
}

const SelectTicket: React.FC<SelectTicketProps> = ({ datetime, setTicket, ticket }) => {
	const { data, loading, error } = useTickets(datetime);
	let options: React.ComponentProps<typeof SelectControl>['options'];
	if (loading) {
		options = [
			{
				label: __('Loading...', 'event_espresso'),
				value: '',
			},
		];
	} else if (error) {
		options = [
			{
				label: __('Error', 'event_espresso'),
				value: '',
			},
		];
	} else {
		options = data?.espressoTickets?.nodes.map(({ id: value, name: label }) => ({ label, value }));
		options = [
			{
				label: __('Select...', 'event_espresso'),
				value: '',
			},
			...options,
		];
	}
	return (
		<SelectControl
			label={__('Select Ticket', 'event_espresso')}
			value={ticket}
			options={options}
			onChange={setTicket}
		/>
	);
};

export default SelectTicket;
