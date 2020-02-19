/**
 * External imports
 */
import * as React from 'react';
import { Icon } from 'antd';
import EspressoButton from '../../../input/EspressoButton';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useEntityListFilterState from './useEntityListFilterState';
import Collapsible from './Collapsible';
import './style.css';

/**
 * EntityListFilterBar
 * a group of inputs for controlling how a list of entities is displayed
 */
const EntityListFilterBar = ({ listId, entityFilters = null }) => {
	const {
		perPage,
		searchText,
		setListView,
		setGridView,
		setPerPage,
		setSearchText,
		showEntityFilters,
		toggleEntityFilters,
		view,
	} = useEntityListFilterState();

	const listViewButton = React.useMemo(
		() => (
			<>
				<label className='esprs-button-label screen-reader-text' htmlFor={`ee-list-view-btn-${listId}`}>
					{__('list view')}
				</label>
				<EspressoButton
					id={`ee-list-view-btn-${listId}`}
					className={view === 'list' ? 'ee-filter-bar-filter ee-active-filters' : 'ee-filter-bar-filter'}
					icon='table'
					tooltip={__('list view')}
					onClick={setListView}
				/>
			</>
		),
		[listId, view, setListView]
	);
	/*
	buttonText?: string;
	buttonProps?: object;
	htmlClass?: string;
	icon?: Icon | string;
	onClick: ClickHandler;
	size?: EspressoButtonSize;
	btnType?: EspressoButtonType;
	[key: string]: any;
*/
	const gridViewButton = React.useMemo(
		() => (
			<>
				<label className='esprs-button-label screen-reader-text' htmlFor={`ee-grid-view-btn-${listId}`}>
					{__('list view')}
				</label>
				<EspressoButton
					id={`ee-grid-view-btn-${listId}`}
					icon={<Icon type='appstore' theme='filled' />}
					className={view === 'grid' ? 'ee-filter-bar-filter ee-active-filters' : 'ee-filter-bar-filter'}
					tooltip={__('grid view')}
					onClick={setGridView}
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
					id={`ee-grid-filter-btn-${listId}`}
					icon='filter'
					tooltip={__('filter')}
					onClick={toggleEntityFilters}
					className={showEntityFilters ? 'ee-filter-bar-filter ee-active-filters' : 'ee-filter-bar-filter'}
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
				perPage={perPage}
				searchText={searchText}
				setPerPage={setPerPage}
				setSearchText={setSearchText}
				showEntityFilters={showEntityFilters}
			/>
		</div>
	);
};

export default EntityListFilterBar;
