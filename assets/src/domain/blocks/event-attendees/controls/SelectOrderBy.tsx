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
			value: 'ID',
		},
		{
			label: __('Last name only', 'event_espresso'),
			value: 'LAST_NAME',
		},
		{
			label: __('First name only', 'event_espresso'),
			value: 'FIRST_NAME',
		},
		{
			label: __('First, then Last name', 'event_espresso'),
			value: 'FIRST_THEN_LAST_NAME',
		},
		{
			label: __('Last, then First name', 'event_espresso'),
			value: 'LAST_THEN_FIRST_NAME',
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
