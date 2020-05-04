import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

interface SelectOrderProps {
	setOrder?: (order: string) => void;
	order: string;
}

const SelectOrder: React.FC<SelectOrderProps> = ({ setOrder, order }) => {
	const options: React.ComponentProps<typeof SelectControl>['options'] = [
		{
			label: __('Ascending', 'event_espresso'),
			value: 'QUERY_ORDER_ASC',
		},
		{
			label: __('Descending', 'event_espresso'),
			value: 'QUERY_ORDER_DESC',
		},
	];

	return (
		<SelectControl
			label={__('Sort order:', 'event_espresso')}
			value={order}
			options={options}
			onChange={setOrder}
		/>
	);
};

export default SelectOrder;
