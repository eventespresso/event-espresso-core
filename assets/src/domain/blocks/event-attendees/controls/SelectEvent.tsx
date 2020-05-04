import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';
import useEvents from '../hooks/useEvents';

interface SelectEventProps {
	event: string;
	setEvent?: (event: string) => void;
}

const SelectEvent: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { event } = attributes;

	const { data, loading, error } = useEvents();
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
		options = data?.espressoEvents?.nodes.map(({ id: value, name: label }) => ({ label, value }));
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
			label={__('Select Event', 'event_espresso')}
			value={event}
			options={options}
			onChange={(event): void => setAttributes({ event, datetime: '', ticket: '' })}
		/>
	);
};

export default SelectEvent;
