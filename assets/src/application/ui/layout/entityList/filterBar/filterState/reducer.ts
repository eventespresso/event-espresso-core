import { BasicSortBy, EntityListFilterStateReducer } from './types';

const getReducer = <SortBy = BasicSortBy>(): EntityListFilterStateReducer<SortBy> => {
	const reducer: EntityListFilterStateReducer<SortBy> = (state, action) => {
		const { type, perPage, pageNumber, total, searchText, sortBy, view } = action;

		switch (type) {
			case 'SET_SEARCH_TEXT':
				return { ...state, searchText };

			case 'SET_PER_PAGE':
				return { ...state, perPage };

			case 'SET_PAGE_NUMBER':
				return { ...state, pageNumber };

			case 'SET_TOTAL':
				return { ...state, total };

			case 'SET_SORT_BY':
				return { ...state, sortBy };

			case 'SET_VIEW':
				// disable sorting when card view is selected
				return { ...state, view, sortingEnabled: view === 'card' ? false : state.sortingEnabled };

			case 'TOGGLE_SORTING':
				const sortingEnabled = !state.sortingEnabled;
				// switch to table view when sorting enabled
				return { ...state, sortingEnabled, view: sortingEnabled ? 'table' : state.view };

			default:
				throw new Error('Unexpected action');
		}
	};

	return reducer;
};

export default getReducer;
