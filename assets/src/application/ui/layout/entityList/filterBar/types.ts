import { EntityListFilterStateManager } from './filterState';

export interface CollapsibleProps {
	entityFilters: JSX.Element;
	listId: string;
	searchText: string;
	setSearchText: (text: string) => void;
	showEntityFilters: boolean;
}

export interface EntityListFilterBarProps {
	entityFilters: JSX.Element;
	filterState: EntityListFilterStateManager;
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
