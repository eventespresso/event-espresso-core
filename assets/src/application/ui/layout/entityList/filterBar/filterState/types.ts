import { Entity } from '@dataServices/types';

export type BasicSortBy = 'name' | 'id';

export interface EntityListFilterState<SortBy = BasicSortBy> extends View {
	perPage: number;
	pageNumber: number;
	total: number;
	searchText: string;
	sortBy: SortBy;
	sortingEnabled: boolean;
}

export type EntityListFilterActionType =
	| 'SET_SORT_BY'
	| 'SET_PER_PAGE'
	| 'SET_PAGE_NUMBER'
	| 'SET_TOTAL'
	| 'SET_SEARCH_TEXT'
	| 'SET_VIEW'
	| 'TOGGLE_SORTING';

export interface EntityListFilterAction<SortBy = BasicSortBy> extends Partial<EntityListFilterState<SortBy>> {
	type: EntityListFilterActionType;
}

export interface EntityListFilterStateManager<SortBy = BasicSortBy> extends EntityListFilterState<SortBy> {
	getState: () => EntityListFilterState<SortBy>;
	setSortBy: (sortBy: SortBy) => void;
	setPerPage: (newPageNumber: number, newPerPage: number) => void;
	setPageNumber: (page: number) => void;
	setTotal: (total: number) => void;
	setSearchText: (text: string) => void;
	setCardView: VoidFunction;
	setTableView: VoidFunction;
	toggleSorting: VoidFunction;
}

export type EntityListFilterStateReducer<SortBy = BasicSortBy> = (
	state: EntityListFilterState<SortBy>,
	action: EntityListFilterAction<SortBy>
) => EntityListFilterState<SortBy>;

/***************************/
type ELFSM = EntityListFilterStateManager;
export type EntityFilterServiceHook = <D extends string, L extends string, E extends Entity, FS extends ELFSM>(
	domain: D,
	listId: L
) => EntityFilterService<E, FS>;

export interface EntityFilterService<E extends Entity, FS extends ELFSM> {
	applyFilters: (entityList: Array<E>, filterState: FS) => Array<E>;
	applySearches: (entityList: Array<E>, filterState: FS) => Array<E>;
	applySorters: (entityList: Array<E>, filterState: FS) => Array<E>;
}

export interface View {
	view?: 'card' | 'table';
}
