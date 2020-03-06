import { EntityListFilterState } from './useEntityListFilterState';

export interface CollapsibleProps {
	entityFilters: JSX.Element;
	listId: string;
	searchText: string;
	setSearchText: voidFn;
	showEntityFilters: boolean;
}

export interface EntityListFilterBarProps {
	entityFilters: JSX.Element;
	filterState: EntityListFilterState;
	listId?: string;
}

export interface GridViewFilterButtonProps {
	listId?: string;
	setGridView: voidFn;
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
	toggleFilters: voidFn;
}

export type voidFn = () => void;
