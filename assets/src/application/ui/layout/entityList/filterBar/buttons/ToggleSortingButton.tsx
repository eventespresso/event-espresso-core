import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { Sort } from '@appDisplay/icons/svgs';
import { ToggleSortingButtonProps } from '../types';

import { getPropsAreEqual } from '@appServices/utilities';

const ToggleSortingButton: React.FC<ToggleSortingButtonProps> = ({
	listId,
	sortingEnabled,
	toggleSorting,
	...rest
}) => {
	const id = `ee-toggle-sorting-btn-${listId}`;
	const tooltip = sortingEnabled ? __('disable sorting') : __('enable sorting');
	const tooltipProps = { placement: 'top' as 'top' };

	return (
		<Button
			active={sortingEnabled}
			className='ee-filter-bar__btn'
			icon={Sort}
			id={id}
			onClick={toggleSorting}
			tooltip={tooltip}
			tooltipProps={tooltipProps}
			labelClassName='ee-filter-bar__btn-wrap'
			{...rest}
		>
			{__('sorting')}
		</Button>
	);
};

export default React.memo(ToggleSortingButton, getPropsAreEqual(['listId'], ['sortingEnabled']));
