/**
 * External imports
 */
import * as React from 'react';
import { withInstanceId } from '@wordpress/compose';
import { IconButton } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import useEntityListFilterState from './useEntityListFilterState';
import Collapsible from './Collapsible';
import './style.css';

/**
 * EntityListFilterBar
 * a group of inputs for controlling how a list of entities is displayed
 *
 * @param {string} listId
 * @param {string} instanceId
 * @param {Object} entityFilters additional entity specific filters
 * @return {Object} EntityListFilterBar
 */
const EntityListFilterBar = ({ listId: id, instanceId, entityFilters = null }) => {
	const listId = id ? id : 'entity-list-' + instanceId;
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
				<label className='screen-reader-text' htmlFor={`ee-list-view-btn-${listId}`}>
					{__('list view', 'event_espresso')}
				</label>
				<IconButton
					id={`ee-list-view-btn-${listId}`}
					className={view === 'list' ? 'ee-filter-bar-filter ee-active-filters' : 'ee-filter-bar-filter'}
					icon='list-view'
					tooltip={__('list view', 'event_espresso')}
					onClick={setListView}
				/>
			</>
		),
		[listId, view, setListView]
	);

	const gridViewButton = React.useMemo(
		() => (
			<>
				<label className='screen-reader-text' htmlFor={`ee-grid-view-btn-${listId}`}>
					{__('list view', 'event_espresso')}
				</label>
				<IconButton
					id={`ee-grid-view-btn-${listId}`}
					className={view === 'grid' ? 'ee-filter-bar-filter ee-active-filters' : 'ee-filter-bar-filter'}
					icon='grid-view'
					tooltip={__('grid view', 'event_espresso')}
					onClick={setGridView}
				/>
			</>
		),
		[listId, view, setGridView]
	);

	const showFiltersButton = React.useMemo(
		() => (
			<>
				<label className='screen-reader-text' htmlFor={`ee-grid-filter-btn-${listId}`}>
					{__('show filters', 'event_espresso')}
				</label>
				<IconButton
					id={`ee-grid-filter-btn-${listId}`}
					icon='filter'
					tooltip={__('filter', 'event_espresso')}
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

export default withInstanceId(EntityListFilterBar);
