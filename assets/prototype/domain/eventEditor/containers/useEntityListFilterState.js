import { useReducer, useEffect } from '@wordpress/element';
import { assocPath } from 'ramda';

const useEntityListFilterState = (listId) => {
	const initialState = {
		[listId]: {
			perPage: 6,
			searchText: '',
			view: 'list',
		},
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('useEntityListFilterState >>>', state);
	}, [state]);

	const setGridView = () => {
		dispatch({
			listId,
			type: 'SET_VIEW',
			view: 'grid',
		});
	};

	const setListView = () => {
		dispatch({
			listId,
			type: 'SET_VIEW',
			view: 'list',
		});
	};

	const setPerPage = (perPage) => {
		dispatch({
			listId,
			perPage,
			type: 'SET_PER_PAGE',
		});
	};

	const setSearchText = (searchText) => {
		dispatch({
			listId,
			searchText,
			type: 'SET_SEARCH_TEXT',
		});
	};

	return {
		perPage: state.perPage,
		searchText: state.searchText,
		setListView,
		setGridView,
		setPerPage,
		setSearchText,
		view: state.view,
	};
};

const reducer = (state, action) => {
	const { listId, perPage, searchText, view } = action;

	switch (action.type) {
		case 'SET_PER_PAGE':
			return assocPath([listId, 'perPage'], perPage, state);

		case 'SET_SEARCH_TEXT':
			return assocPath([listId, 'searchText'], searchText, state);

		case 'SET_VIEW':
			return assocPath([listId, 'view'], view, state);

		default:
			throw new Error('Unexpected action');
	}
};

export default useEntityListFilterState;
