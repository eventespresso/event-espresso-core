import React from 'react';

import Collapsible from './Collapsible';
import { EntityListFilterBarProps } from './types';
import GridViewFilterButton from './buttons/GridView';
import ListViewFilterButton from './buttons/ListView';
import ToggleFiltersButton from './buttons/ToggleFilters';
import { useFilterBarUIElements } from './subscription';
import { EntityListFilterStateManager as ELFSM } from './filterState';

import './style.scss';

/**
 * EntityListFilterBar
 * a group of inputs for controlling how a list of entities is displayed
 */
const EntityListFilterBar = <FS extends ELFSM>({
	domain,
	filterState,
	listId,
}: EntityListFilterBarProps<FS>): JSX.Element => {
	const {
		searchText,
		setListView,
		setGridView,
		setSearchText,
		showEntityFilters,
		toggleEntityFilters,
		view,
	} = filterState;

	const filerBarItems = useFilterBarUIElements({ domain, filterState, listId });

	return (
		<div className='ee-entity-list-filter-bar'>
			<div className='ee-filter-bar-filter-main'>
				<ListViewFilterButton listId={listId} setListView={setListView} view={view} />
				<GridViewFilterButton listId={listId} setGridView={setGridView} view={view} />
				<ToggleFiltersButton
					listId={listId}
					showFilters={showEntityFilters}
					toggleFilters={toggleEntityFilters}
				/>
			</div>

			<Collapsible
				entityFilters={filerBarItems}
				listId={listId}
				searchText={searchText}
				setSearchText={setSearchText}
				showEntityFilters={showEntityFilters}
			/>
		</div>
	);
};

export default EntityListFilterBar;
