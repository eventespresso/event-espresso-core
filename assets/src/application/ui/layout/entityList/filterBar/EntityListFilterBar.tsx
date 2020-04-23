import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';

import CardViewFilterButton from './buttons/CardViewFilterButton';
import Collapsible from './Collapsible';
import { EntityListFilterBarProps } from './types';
import { EntityListLegend } from '@application/ui/display';
import TableViewFilterButton from './buttons/TableViewFilterButton';
import ToggleLegendButton from './buttons/ToggleLegendButton';
import ToggleFiltersButton from './buttons/ToggleFiltersButton';
import ToggleSortingButton from './buttons/ToggleSortingButton';
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
	const toggleLegend = () => setShowLegend(!showLegend);

	const [showEntityFilters, setShowEntityFilters] = useState(false);
	const toggleEntityFilters = () => setShowEntityFilters((v) => !v);

	const { searchText, setCardView, setTableView, setSearchText, sortingEnabled, toggleSorting, view } = filterState;

	const filerBarItems = useFilterBarUIElements({ domain, filterState, listId });

	useEffect(() => {
		if (sortingEnabled) {
			setShowEntityFilters(false);
			setShowLegend(false);
		}
	}, [sortingEnabled]);

	return (
		<div className='ee-filter-bar'>
			<div className='ee-filter-bar__main'>
				<TableViewFilterButton listId={listId} setTableView={setTableView} view={view} />
				<CardViewFilterButton listId={listId} setCardView={setCardView} view={view} />
				<ToggleFiltersButton
					listId={listId}
					showFilters={showEntityFilters}
					toggleFilters={toggleEntityFilters}
					isDisabled={sortingEnabled}
				/>
				<ToggleSortingButton listId={listId} sortingEnabled={sortingEnabled} toggleSorting={toggleSorting} />
				<ToggleLegendButton
					listId={listId}
					showLegend={showLegend}
					toggleLegend={toggleLegend}
					isDisabled={sortingEnabled}
				/>
			</div>

			<Collapsible show={showEntityFilters}>
				{filerBarItems}
				<div className='ee-filter-bar__filter'>
					<SearchInput
						id={listId}
						label={__('search')}
						searchText={searchText}
						setSearchText={setSearchText}
					/>
				</div>
			</Collapsible>

			<Collapsible show={showLegend}>
				<EntityListLegend legendConfig={legendConfig} />
			</Collapsible>
		</div>
	);
};

export default EntityListFilterBar;
