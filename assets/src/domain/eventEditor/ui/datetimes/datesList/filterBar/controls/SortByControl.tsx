import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@appInputs/SelectInput';
import { SortBy } from '@sharedServices/filterState';

interface SortByControlProps {
	sortBy: SortBy;
	setSortBy: (sortBy: SortBy) => void;
}

type SortByOptions = Array<{
	value: SortBy;
	label: string;
}>;
/**
 * filter for controlling the sorting of a list of Event Dates
 */
const SortByControl: React.FC<SortByControlProps> = React.memo(({ sortBy, setSortBy }) => {
	const options: SortByOptions = [
		{
			value: 'date',
			label: __('start date'),
		},
		{
			value: 'name',
			label: __('name'),
		},
		{
			value: 'id',
			label: __('ID'),
		},
		{
			value: 'order',
			label: __('custom order'),
		},
	];
	return (
		<SelectInput
			label={__('sort by')}
			className='espresso-date-list-filter-bar-order-select'
			value={sortBy}
			options={options}
			onChange={setSortBy}
		/>
	);
});

export default SortByControl;
