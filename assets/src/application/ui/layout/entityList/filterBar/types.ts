import React from 'react';
import { EntityListFilterStateManager as ELFSM } from './filterState';

export interface CollapsibleProps {
	entityFilters: React.ReactNode;
	listId: string;
	searchText: string;
	setSearchText: (text: string) => void;
	showEntityFilters: boolean;
}

export interface EntityListFilterBarProps<FS extends ELFSM> {
	domain: string;
	entityFilters: React.ReactNode;
	filterState: FS;
	listId?: string;
}

export interface GridViewFilterButtonProps {
	listId?: string;
	setGridView: VoidFunction;
	view?: string;
}

export interface ListViewFilterButtonProps {
	listId?: string;
	setListView: () => void;
	view?: string;
}

export interface ToggleFiltersButtonProps {
	listId?: string;
	showFilters?: boolean;
	toggleFilters: VoidFunction;
}
