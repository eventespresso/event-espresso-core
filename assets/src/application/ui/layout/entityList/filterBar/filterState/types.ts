export type BasicSortBy = 'name' | 'id';

export interface EntityListFilterState<SortBy = BasicSortBy> {
	perPage: number;
	pageNumber: number;
	total: number;
	searchText: string;
	showEntityFilters: boolean;
	sortBy: SortBy;
	view?: 'grid' | 'list';
}

export type EntityListFilterActionType =
	| 'SET_SORT_BY'
	| 'SET_PER_PAGE'
	| 'SET_PAGE_NUMBER'
	| 'SET_TOTAL'
	| 'SET_SEARCH_TEXT'
	| 'SET_VIEW'
	| 'TOGGLE_ENTITY_FILTERS';

export interface EntityListFilterAction<SortBy = BasicSortBy> extends Partial<EntityListFilterState<SortBy>> {
	type: EntityListFilterActionType;
}

export interface EntityListFilterStateManager<SortBy = BasicSortBy> extends EntityListFilterState<SortBy> {
	setSortBy: (sortBy: SortBy) => void;
	setPerPage: (newPageNumber: number, newPerPage: number) => void;
	setPageNumber: (page: number) => void;
	setTotal: (total: number) => void;
	setSearchText: (text: string) => void;
	setGridView: VoidFunction;
	setListView: VoidFunction;
	toggleEntityFilters: VoidFunction;
}

export type EntityListFilterStateReducer<SortBy = BasicSortBy> = (
	state: EntityListFilterState<SortBy>,
	action: EntityListFilterAction<SortBy>
) => EntityListFilterState<SortBy>;
