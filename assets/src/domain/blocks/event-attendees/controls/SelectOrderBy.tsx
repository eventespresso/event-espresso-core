import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

interface SelectOrderByProps {
	setOrderBy?: (orderBy: string) => void;
	orderBy: string;
}

const SelectOrderBy: React.FC<SelectOrderByProps> = ({ setOrderBy, orderBy }) => {
	const options: React.ComponentProps<typeof SelectControl>['options'] = [
		{
			label: __('Attendee id', 'event_espresso'),
			value: 'id',
		},
		{
			label: __('Last name only', 'event_espresso'),
			value: 'lastNameOnly',
		},
		{
			label: __('First name only', 'event_espresso'),
			value: 'firstNameOnly',
		},
		{
			label: __('First, then Last name', 'event_espresso'),
			value: 'firstThenLastName',
		},
		{
			label: __('Last, then First name', 'event_espresso'),
			value: 'lastThenFirstName',
		},
	];

	return (
		<SelectControl
			label={__('Order Attendees by:', 'event_espresso')}
			value={orderBy}
			options={options}
			onChange={setOrderBy}
		/>
	);
};

export default SelectOrderBy;
