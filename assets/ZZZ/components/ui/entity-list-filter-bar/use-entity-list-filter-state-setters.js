/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';

const useEntityListFilterStateSetters = ( listId ) => {
	const store = useDispatch( 'eventespresso/filter-state' );
	return {
		setSearchText: ( searchText ) => store.setFilter(
			listId,
			'searchText',
			searchText
		),
		setPerPage: ( perPage ) => store.setFilter(
			listId,
			'perPage',
			parseInt( perPage, 10 )
		),
		setListView: () => store.setFilter(
			listId,
			'view',
			'list'
		),
		setGridView: () => store.setFilter(
			listId,
			'view',
			'grid'
		),
	};
};

export default useEntityListFilterStateSetters;
