import React from 'react';
import classNames from 'classnames';
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
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': sortingEnabled });
	const id = `ee-toggle-sorting-btn-${listId}`;
	const tooltip = sortingEnabled ? __('disable sorting') : __('enable sorting');
	const tooltipProps = { placement: 'top' as 'top' };

	return (
		<Button
			className={className}
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
