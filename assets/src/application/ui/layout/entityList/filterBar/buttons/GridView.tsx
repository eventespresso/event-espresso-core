import React from 'react';
import { AppstoreFilled } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import FilterButtonWrap from './FilterButtonWrap';
import { GridViewFilterButtonProps } from '../types';
import { EspressoButton, EspressoButtonType } from '../../../../input/EspressoButton';

const GridViewFilterButton: React.FC<GridViewFilterButtonProps> = ({ listId, setGridView, view }) =>
	React.useMemo(() => {
		const filterId = `ee-grid-view-btn-${listId}`;

		return (
			<FilterButtonWrap id={filterId} label={__('card view')}>
				<EspressoButton
					buttonType={EspressoButtonType.MINIMAL}
					className={
						view === 'grid' ? 'ee-filter-bar-filter-btn ee-active-filters' : 'ee-filter-bar-filter-btn'
					}
					icon={<AppstoreFilled />}
					id={filterId}
					onClick={setGridView}
					tooltip={__('card view')}
				/>
			</FilterButtonWrap>
		);
	}, [listId, setGridView, view]);

export default GridViewFilterButton;
