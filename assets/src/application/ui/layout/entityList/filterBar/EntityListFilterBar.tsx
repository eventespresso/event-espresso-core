import React from 'react';
import { AppstoreFilled, FilterOutlined, TableOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonType, Icon } from '../../../input/EspressoButton';
import Collapsible from './Collapsible';
import { EntityListFilterState } from './useEntityListFilterState';

import './style.scss';

interface EntityListFilterBarProps {
	entityFilters: JSX.Element;
	filterState: EntityListFilterState;
	listId?: string;
}

/**
 * EntityListFilterBar
 * a group of inputs for controlling how a list of entities is displayed
 */
const EntityListFilterBar: React.FC<EntityListFilterBarProps> = ({ entityFilters, filterState, listId }) => {
	if (!filterState) return null;

	const {
		searchText,
		setListView,
		setGridView,
		setSearchText,
		showEntityFilters,
		toggleEntityFilters,
		view,
	}: EntityListFilterState = filterState;

	const listViewButton = React.useMemo(
		() => (
			<>
				<label className='esprs-button-label screen-reader-text' htmlFor={`ee-list-view-btn-${listId}`}>
					{__('table view')}
				</label>
				<EspressoButton
					buttonType={EspressoButtonType.MINIMAL}
					className={view === 'list' ? 'ee-filter-bar-filter ee-active-filters' : 'ee-filter-bar-filter'}
					icon={Icon.LIST_VIEW}
					id={`ee-list-view-btn-${listId}`}
					onClick={setListView}
					tooltip={__('table view')}
				/>
			</>
		),
		[listId, view, setListView]
	);

	const gridViewButton = React.useMemo(
		() => (
			<>
				<label className='esprs-button-label screen-reader-text' htmlFor={`ee-grid-view-btn-${listId}`}>
					{__('card view')}
				</label>
				<EspressoButton
					buttonType={EspressoButtonType.MINIMAL}
					className={view === 'grid' ? 'ee-filter-bar-filter ee-active-filters' : 'ee-filter-bar-filter'}
					icon={<AppstoreFilled />}
					id={`ee-grid-view-btn-${listId}`}
					onClick={setGridView}
					tooltip={__('card view')}
				/>
			</>
		),
		[listId, view, setGridView]
	);

	const showFiltersButton = React.useMemo(
		() => (
			<>
				<label className='esprs-button-label screen-reader-text' htmlFor={`ee-grid-filter-btn-${listId}`}>
					{__('show filters')}
				</label>
				<EspressoButton
					buttonType={EspressoButtonType.MINIMAL}
					className={showEntityFilters ? 'ee-filter-bar-filter ee-active-filters' : 'ee-filter-bar-filter'}
					icon={Icon.FILTER}
					id={`ee-grid-filter-btn-${listId}`}
					onClick={toggleEntityFilters}
					tooltip={__('show filters')}
				/>
			</>
		),
		[listId, toggleEntityFilters]
	);

	return (
		<div className='ee-entity-list-filter-bar-wrapper'>
			<div className='ee-filter-bar-filter-main'>
				{listViewButton}
				{gridViewButton}
				{showFiltersButton}
			</div>

			<Collapsible
				entityFilters={entityFilters}
				listId={listId}
				searchText={searchText}
				setSearchText={setSearchText}
				showEntityFilters={showEntityFilters}
			/>
		</div>
	);
};

export default EntityListFilterBar;
