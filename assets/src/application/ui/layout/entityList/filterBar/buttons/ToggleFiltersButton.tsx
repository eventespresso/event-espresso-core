import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { Filter } from '@appDisplay/icons';
import { IconButton } from '@appInputs/Button';
import { LabelPosition } from '@application/ui/display';
import { ToggleFiltersButtonProps } from '../types';
import { getPropsAreEqual } from '@appServices/utilities';

const ToggleFiltersButton: React.FC<ToggleFiltersButtonProps> = ({ listId, showFilters, toggleFilters, ...rest }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': showFilters });
	const filterId = `ee-toggle-filters-btn-${listId}`;
	const tooltip = showFilters ? __('hide filters') : __('show filters');

	return (
		<IconButton
			className={ className }
			icon={ Filter }
			id={ filterId }
			label={ __('filters') }
			onClick={ toggleFilters }
			tooltip={ tooltip }
			tooltipProps={ { placement: 'top' } }
			labelClassName={ 'ee-filter-bar__btn-wrap' }
			labelPosition={ LabelPosition.BOTTOM_CENTER }
			variant='outline'
			{ ...rest }
		/>
	);
};

export default React.memo(ToggleFiltersButton, getPropsAreEqual(['listId'], ['showFilters'], ['isDisabled']));
