import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import useDatetimes from '../hooks/useDatetimes';

interface SelectDatetimeProps {
	datetime: string;
	event: string;
	setDatetime?: (datetime: string) => void;
}

const SelectDatetime: React.FC<SelectDatetimeProps> = ({ datetime, event, setDatetime }) => {
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
			onChange={setDatetime}
		/>
	);
};

export default SelectDatetime;
