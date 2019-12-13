import { useReducer, useEffect } from '@wordpress/element';

const useEntityListFilterState = () => {
	const initialState = {
		perPage: 6,
		searchText: '',
		showEntityFilters: false,
		view: 'list',
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('useEntityListFilterState >>>', state);
	}, [state]);

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
		const showEntityFilters = !state.showEntityFilters;

		dispatch({
			type: 'TOGGLE_ENTITY_FILTERS',
			showEntityFilters,
		});
	};

	const perPage = state.perPage;
	const searchText = state.searchText;
	const showEntityFilters = state.showEntityFilters;
	const view = state.view;

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
	const { perPage, searchText, showEntityFilters, view } = action;

	switch (action.type) {
		case 'SET_PER_PAGE':
			return { ...state, perPage };

		case 'SET_SEARCH_TEXT':
			return { ...state, searchText };

		case 'SET_VIEW':
			return { ...state, view };

		case 'TOGGLE_ENTITY_FILTERS':
			return { ...state, showEntityFilters };

		default:
			throw new Error('Unexpected action');
	}
};

export default useEntityListFilterState;
