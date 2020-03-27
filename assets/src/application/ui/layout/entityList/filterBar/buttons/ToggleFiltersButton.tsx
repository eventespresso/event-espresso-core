import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import FilterButtonWrap from './FilterButtonWrap';
import { ToggleFiltersButtonProps } from '../types';
import { EspressoButton, EspressoButtonType, Icon } from '@appInputs/EspressoButton';

const ToggleFiltersButton: React.FC<ToggleFiltersButtonProps> = React.memo(({ listId, showFilters, toggleFilters }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': showFilters });
	const filterId = `ee-toggle-filters-btn-${listId}`;
	const tooltip = __(`${showFilters ? 'hide' : 'show'} filters`);

	return (
		<FilterButtonWrap id={filterId} label={__('filters')}>
			<EspressoButton
				buttonType={EspressoButtonType.MINIMAL}
				className={className}
				icon={Icon.FILTER}
				id={filterId}
				onClick={toggleFilters}
				tooltip={tooltip}
			/>
		</FilterButtonWrap>
	);
});

export default ToggleFiltersButton;
