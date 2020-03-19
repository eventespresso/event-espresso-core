import React, { useState } from 'react';

import Collapsible from './Collapsible';
import { EntityListFilterBarProps } from './types';
import { EntityListLegend } from '@application/ui/display';
import GridViewFilterButton from './buttons/GridView';
import ToggleLegendButton from './buttons/ToggleLegend';
import ListViewFilterButton from './buttons/ListView';
import ToggleFiltersButton from './buttons/ToggleFilters';
import { SearchInput } from '@application/ui/input';
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
	legendConfig,
	listId,
}: EntityListFilterBarProps<FS>): JSX.Element => {
	const [showLegend, setShowLegend] = useState(false);
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
	const toggleLegend = () => setShowLegend(!showLegend);

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
				<ToggleLegendButton listId={listId} showLegend={showLegend} toggleLegend={toggleLegend} />
			</div>

			<Collapsible show={showEntityFilters}>
				{filerBarItems}
				<SearchInput
					className={'ee-filter-bar-filter ee-filter-bar-filter--big'}
					id={listId}
					searchText={searchText}
					setSearchText={setSearchText}
				/>
			</Collapsible>

			<Collapsible show={showLegend}>
				<EntityListLegend legendConfig={legendConfig} />
			</Collapsible>
		</div>
	);
};

export default EntityListFilterBar;
