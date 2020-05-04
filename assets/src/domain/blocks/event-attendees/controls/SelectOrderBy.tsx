import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';
import OrderByControl from '../../components/OrderByControl';

const SelectOrderBy: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { orderBy } = attributes;

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
		<OrderByControl
			label={__('Order Attendees by:', 'event_espresso')}
			orderBy={orderBy}
			options={options}
			setOrderBy={(orderBy): void => setAttributes({ orderBy })}
		/>
	);
};

export default SelectOrderBy;
