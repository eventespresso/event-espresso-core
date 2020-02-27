import { useReducer } from 'react';

export interface EntityListFilterState {
	searchText: any;
	setGridView: any;
	setListView: any;
	setSearchText: any;
	showEntityFilters: any;
	toggleEntityFilters: any;
	view?: 'grid' | 'list';
}

const useEntityListFilterState = (): EntityListFilterState => {
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

	const searchText = state.searchText;
	const showEntityFilters = state.showEntityFilters;
	const view = state.view;

	return {
		searchText,
		setGridView,
		setListView,
		setSearchText,
		showEntityFilters,
		toggleEntityFilters,
		view,
	};
};

const reducer = (state, action) => {
	const { searchText, view } = action;

	switch (action.type) {
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
