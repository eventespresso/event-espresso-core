import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';
import useDatetimes from '../hooks/useDatetimes';

const SelectDatetime: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { datetime, event } = attributes;

	const { data, loading, error } = useDatetimes(event);
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
		options = data?.espressoDatetimes?.nodes.map(({ id: value, name: label }) => ({ label, value }));
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
			label={__('Select Datetime', 'event_espresso')}
			value={datetime}
			options={options}
			onChange={(datetime): void => setAttributes({ datetime, ticket: '' })}
		/>
	);
};

export default SelectDatetime;
