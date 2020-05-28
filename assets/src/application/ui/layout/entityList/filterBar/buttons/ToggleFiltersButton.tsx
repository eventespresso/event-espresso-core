import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { Filter } from '@appDisplay/icons';
import { ToggleFiltersButtonProps } from '../types';

import { getPropsAreEqual } from '@appServices/utilities';

const ToggleFiltersButton: React.FC<ToggleFiltersButtonProps> = ({ listId, showFilters, toggleFilters, ...rest }) => {
	const filterId = `ee-toggle-filters-btn-${listId}`;
	const tooltip = showFilters ? __('hide filters') : __('show filters');

	return (
		<Button
			active={showFilters}
			className='ee-filter-bar__btn ee-btn--small'
			icon={Filter}
			id={filterId}
			onClick={toggleFilters}
			labelClassName={'ee-filter-bar__btn-wrap'}
			{...rest}
		>
			{showFilters ? __('hide filters') : __('show filters')}
		</Button>
	);
};

export default React.memo(ToggleFiltersButton, getPropsAreEqual(['listId'], ['showFilters'], ['isDisabled']));
