import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { Filter } from '@appDisplay/Icons';
import { IconButton } from '@appInputs/Button';
import { LabelPosition } from '@application/ui/display';
import { ToggleFiltersButtonProps } from '../types';
import { getPropsAreEqual } from '@appServices/utilities';

const ToggleFiltersButton: React.FC<ToggleFiltersButtonProps> = React.memo(({ listId, showFilters, toggleFilters }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': showFilters });
	const filterId = `ee-toggle-filters-btn-${listId}`;
	const tooltip = __(`${showFilters ? 'hide' : 'show'} filters`);

	return (
		<IconButton
			className={className}
			icon={Filter}
			id={filterId}
			label={__('filters')}
			onClick={toggleFilters}
			tooltip={tooltip}
			labelClassName={'ee-filter-bar__btn-wrap'}
			labelPosition={LabelPosition.BOTTOM_CENTER}
			variant='outline'
		/>
	);
});

export default React.memo(ToggleFiltersButton, getPropsAreEqual(['listId'], ['showFilters']));
