import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { SelectControlProps } from './types';

interface SortOrderControlProps extends SelectControlProps {
	setOrder?: (order: string) => void;
	order: string;
}

const defaultOptions: React.ComponentProps<typeof SelectControl>['options'] = [
	{
		label: __('Ascending', 'event_espresso'),
		value: 'ASC',
	},
	{
		label: __('Descending', 'event_espresso'),
		value: 'DESC',
	},
];

const SortOrderControl: React.FC<SortOrderControlProps> = ({ order, setOrder, options = defaultOptions, ...rest }) => {
	return (
		<SelectControl
			label={__('Sort order:', 'event_espresso')}
			value={order}
			options={options}
			onChange={setOrder}
			{...rest}
		/>
	);
};

export default SortOrderControl;
