import React, { useState } from 'react';

import CardViewFilterButton from './buttons/CardView';
import Collapsible from './Collapsible';
import { EntityListFilterBarProps } from './types';
import { EntityListLegend } from '@application/ui/display';
import TableViewFilterButton from './buttons/TableView';
import ToggleLegendButton from './buttons/ToggleLegend';
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
		setCardView,
		setTableView,
		setSearchText,
		showEntityFilters,
		toggleEntityFilters,
		view,
	} = filterState;

	const filerBarItems = useFilterBarUIElements({ domain, filterState, listId });
	const toggleLegend = () => setShowLegend(!showLegend);

	return (
		<div className='ee-entity-list-filter-bar'>
			<div className='ee-entity-list-filter-bar--main'>
				<TableViewFilterButton listId={listId} setTableView={setTableView} view={view} />
				<CardViewFilterButton listId={listId} setCardView={setCardView} view={view} />
				<ToggleFiltersButton
					listId={listId}
					showFilters={showEntityFilters}
					toggleFilters={toggleEntityFilters}
				/>
				<ToggleLegendButton listId={listId} showLegend={showLegend} toggleLegend={toggleLegend} />
			</div>

			<Collapsible className='ee-entity-list-filter-bar--collapsible' show={showEntityFilters}>
				{filerBarItems}
				<SearchInput
					className={'ee-filter-bar-filter ee-filter-bar-filter--big'}
					id={listId}
					searchText={searchText}
					setSearchText={setSearchText}
				/>
			</Collapsible>

			<Collapsible className='ee-entity-list-filter-bar--collapsible' show={showLegend}>
				<EntityListLegend legendConfig={legendConfig} />
			</Collapsible>
		</div>
	);
};

export default EntityListFilterBar;
