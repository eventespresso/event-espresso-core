import { useReducer } from 'react';

const useEntityListFilterState = () => {
	const initialState = {
		perPage: 6,
		searchText: '',
		showEntityFilters: false,
		view: 'grid',
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const setGridView = () => {
		dispatch({
			type: 'SET_VIEW',
			view: 'grid',
		});
	};

	const setListView = () => {
		dispatch({
			type: 'SET_VIEW',
			view: 'list',
		});
	};

	const setPerPage = (perPage) => {
		dispatch({
			perPage,
			type: 'SET_PER_PAGE',
		});
	};

	const setSearchText = (searchText) => {
		dispatch({
			searchText,
			type: 'SET_SEARCH_TEXT',
		});
	};

	const toggleEntityFilters = () => {
		dispatch({
			type: 'TOGGLE_ENTITY_FILTERS',
		});
	};

	const perPage = state.perPage;
	const searchText = state.searchText;
	const showEntityFilters = state.showEntityFilters;
	const view = state.view;

	const actions = {
		setGridView,
		setListView,
		setPerPage,
		setSearchText,
		toggleEntityFilters,
	};

	const configs = {
		perPage,
		searchText,
		showEntityFilters,
		view,
	};

	return {
		perPage,
		searchText,
		setGridView,
		setListView,
		setPerPage,
		setSearchText,
		showEntityFilters,
		toggleEntityFilters,
		view,
	};
};

const reducer = (state, action) => {
	const { perPage, searchText, view } = action;

	switch (action.type) {
		case 'SET_PER_PAGE':
			return { ...state, perPage };

		case 'SET_SEARCH_TEXT':
			return { ...state, searchText };

		case 'SET_VIEW':
			return { ...state, view };

		case 'TOGGLE_ENTITY_FILTERS':
			return { ...state, showEntityFilters: !state.showEntityFilters };

		default:
			throw new Error('Unexpected action');
	}
};

export default useEntityListFilterState;
