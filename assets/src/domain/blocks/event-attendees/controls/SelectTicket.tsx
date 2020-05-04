import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';
import useTickets from '../hooks/useTickets';

const SelectTicket: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { datetime, ticket } = attributes;
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
			onChange={(ticket): void => setAttributes({ ticket })}
		/>
	);
};

export default SelectTicket;
