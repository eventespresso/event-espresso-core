import { useReducer, useEffect } from 'react';

import {
	BasicSortBy,
	EntityListFilterState,
	EntityListFilterStateManager,
	EntityListFilterStateReducer,
} from './types';

type ELFSM<SortBy = BasicSortBy> = EntityListFilterStateManager<SortBy>;

const useEntityListFilterStateManager = <SortBy = BasicSortBy>(defaultSortBy: SortBy): ELFSM<SortBy> => {
	type FSM = ELFSM<SortBy>;

	const initialState: EntityListFilterState<SortBy> = {
		perPage: 6,
		pageNumber: 1,
		total: null,
		searchText: '',
		showEntityFilters: false,
		sortBy: defaultSortBy,
		view: 'grid',
	};
	const [state, dispatch] = useReducer(getReducer<SortBy>(), initialState);

	useEffect(() => {
		console.log('Entity FS', state);
	}, [state]);

	const setSortBy: FSM['setSortBy'] = (sortBy) => {
		dispatch({
			type: 'SET_SORT_BY',
			sortBy,
		});
	};

	const setPerPage: FSM['setPerPage'] = (newPageNumber, newPerPage) => {
		// the pagination component will recalculate the page number
		// if it goes out of range after changing the perPage value,
		// so save that else we'll get no results returned
		if (newPageNumber && newPageNumber !== state.pageNumber) {
			setPageNumber(newPageNumber);
		}
		dispatch({
			type: 'SET_PER_PAGE',
			perPage: newPerPage,
		});
	};

	const setPageNumber: FSM['setPageNumber'] = (pageNumber) => {
		dispatch({
			type: 'SET_PAGE_NUMBER',
			pageNumber,
		});
	};

	const setTotal: FSM['setTotal'] = (total) => {
		dispatch({
			type: 'SET_TOTAL',
			total,
		});
	};

	const setGridView: FSM['setGridView'] = () => {
		dispatch({
			type: 'SET_VIEW',
			view: 'grid',
		});
	};

	const setListView: FSM['setListView'] = () => {
		dispatch({
			type: 'SET_VIEW',
			view: 'list',
		});
	};

	const setSearchText: FSM['setSearchText'] = (searchText) => {
		dispatch({
			searchText,
			type: 'SET_SEARCH_TEXT',
		});
	};

	const toggleEntityFilters: FSM['toggleEntityFilters'] = () => {
		dispatch({
			type: 'TOGGLE_ENTITY_FILTERS',
		});
	};

	return {
		...state,
		setSortBy,
		setPerPage,
		setPageNumber,
		setTotal,
		setGridView,
		setListView,
		setSearchText,
		toggleEntityFilters,
	};
};

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
				return { ...state, view };

			case 'TOGGLE_ENTITY_FILTERS':
				return { ...state, showEntityFilters: !state.showEntityFilters };

			default:
				throw new Error('Unexpected action');
		}
	};

	return reducer;
};

export default useEntityListFilterStateManager;
