import React from 'react';
import { __ } from '@wordpress/i18n';

import FilterButtonWrap from './FilterButtonWrap';
import { ListViewFilterButtonProps } from '../types';
import { EspressoButton, EspressoButtonType, Icon } from '../../../../input/EspressoButton';

const ListViewFilterButton: React.FC<ListViewFilterButtonProps> = ({ listId, setListView, view }) =>
	React.useMemo(() => {
		const filterId = `ee-list-view-btn-${listId}`;

		return (
			<FilterButtonWrap id={filterId} label={__('table view')}>
				<EspressoButton
					buttonType={EspressoButtonType.MINIMAL}
					className={
						view === 'list' ? 'ee-filter-bar-filter-btn ee-active-filters' : 'ee-filter-bar-filter-btn'
					}
					icon={Icon.LIST_VIEW}
					id={filterId}
					onClick={setListView}
					tooltip={__('table view')}
				/>
			</FilterButtonWrap>
		);
	}, [listId, setListView, view]);

export default ListViewFilterButton;
