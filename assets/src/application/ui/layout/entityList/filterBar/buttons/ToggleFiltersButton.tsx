import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonType, Icon } from '@appInputs/EspressoButton';
import { LabelPosition } from '@application/ui/display';
import { ToggleFiltersButtonProps } from '../types';

const ToggleFiltersButton: React.FC<ToggleFiltersButtonProps> = React.memo(({ listId, showFilters, toggleFilters }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': showFilters });
	const filterId = `ee-toggle-filters-btn-${listId}`;
	const tooltip = __(`${showFilters ? 'hide' : 'show'} filters`);

	return (
		<EspressoButton
			buttonType={EspressoButtonType.MINIMAL}
			className={className}
			icon={Icon.FILTER}
			id={filterId}
			label={__('filters')}
			onClick={toggleFilters}
			tooltip={tooltip}
			labelClassName={'ee-filter-bar__btn-wrap'}
			labelPosition={LabelPosition.BOTTOM}
		/>
	);
});

export default ToggleFiltersButton;
