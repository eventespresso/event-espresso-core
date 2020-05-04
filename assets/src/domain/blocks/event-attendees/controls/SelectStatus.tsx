import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';

const SelectStatus: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { status } = attributes;
	const options: React.ComponentProps<typeof SelectControl>['options'] = [
		{
			value: 'RAP',
			label: __('Approved', 'event_espresso'),
		},
		{
			value: 'RCN',
			label: __('Cancelled', 'event_espresso'),
		},
		{
			value: 'RDC',
			label: __('Declined', 'event_espresso'),
		},
		{
			value: 'RIC',
			label: __('Incomplete', 'event_espresso'),
		},
		{
			value: 'RNA',
			label: __('Not Approved', 'event_espresso'),
		},
		{
			value: 'RPP',
			label: __('Pending Payment', 'event_espresso'),
		},
		{
			value: 'RWL',
			label: __('Wait List', 'event_espresso'),
		},
	];

	return (
		<SelectControl
			label={__('Select Registration Status', 'event_espresso')}
			value={status}
			options={options}
			onChange={(status): void => setAttributes({ status })}
		/>
	);
};

export default SelectStatus;
