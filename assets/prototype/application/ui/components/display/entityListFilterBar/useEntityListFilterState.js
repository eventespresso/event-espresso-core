import { useReducer, useEffect } from '@wordpress/element';
import { assocPath, path } from 'ramda';

const useEntityListFilterState = (listId) => {
	const initialState = {
		[listId]: {
			perPage: 6,
			searchText: '',
			showEntityFilters: false,
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

	const toggleEntityFilters = () => {
		const showEntityFilters = !state[listId].showEntityFilters;

		dispatch({
			listId,
			type: 'TOGGLE_ENTITY_FILTERS',
			showEntityFilters,
		});
	};

	const getStateProp = (prop) => path([listId, prop], state);

	const perPage = getStateProp('perPage');
	const searchText = getStateProp('searchText');
	const showEntityFilters = getStateProp('showEntityFilters');
	const view = getStateProp('view');

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
	const { listId, perPage, searchText, showEntityFilters, view } = action;

	switch (action.type) {
		case 'SET_PER_PAGE':
			return assocPath([listId, 'perPage'], perPage, state);

		case 'SET_SEARCH_TEXT':
			return assocPath([listId, 'searchText'], searchText, state);

		case 'SET_VIEW':
			return assocPath([listId, 'view'], view, state);

		case 'TOGGLE_ENTITY_FILTERS':
			return assocPath([listId, 'showEntityFilters'], showEntityFilters, state);

		default:
			throw new Error('Unexpected action');
	}
};

export default useEntityListFilterState;
