import React from 'react';
import { __ } from '@wordpress/i18n';

import { ToggleFiltersButtonProps } from '../types';
import { EspressoButton, EspressoButtonType, Icon } from '../../../../input/EspressoButton';

const ToggleFiltersButton: React.FC<ToggleFiltersButtonProps> = ({ listId, showFilters, toggleFilters }) =>
	React.useMemo(() => {
		const filterId = `ee-toggle-filters-btn-${listId}`;
		return (
			<>
				<label className='esprs-button-label screen-reader-text' htmlFor={filterId}>
					{__('show filters')}
				</label>
				<EspressoButton
					buttonType={EspressoButtonType.MINIMAL}
					className={showFilters ? 'ee-filter-bar-filter-btn ee-active-filters' : 'ee-filter-bar-filter-btn'}
					icon={Icon.FILTER}
					id={filterId}
					onClick={toggleFilters}
					tooltip={__('show filters')}
				/>
			</>
		);
	}, [listId, showFilters, toggleFilters]);

export default ToggleFiltersButton;
