import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import FilterButtonWrap from './FilterButtonWrap';
import { ToggleFiltersButtonProps } from '../types';
import { EspressoButton, EspressoButtonType, Icon } from '@appInputs/EspressoButton';

const ToggleFilters: React.FC<ToggleFiltersButtonProps> = ({ listId, showFilters, toggleFilters }) =>
	React.useMemo(() => {
		const className = classNames('ee-entity-list-filter-bar__btn', { 'ee-active-filters': showFilters });
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
	}, [listId, showFilters, toggleFilters]);

export default ToggleFilters;
