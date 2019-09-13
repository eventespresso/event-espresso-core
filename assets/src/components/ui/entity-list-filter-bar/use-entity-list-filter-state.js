/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useSelect } from '@wordpress/data';

const useEntityListFilterState = ( {
	listId,
	defaultView = 'grid',
	defaultPerPage = 6,
} ) => useSelect( ( select ) => {
		const store = select( 'eventespresso/filter-state' );
		return {
			searchText: store.getFilter(
				listId,
				'searchText',
				''
			),
			perPage: parseInt(
				store.getFilter(
					listId,
					'perPage',
					defaultPerPage
				),
				10
			),
			view: store.getFilter(
				listId,
				'view',
				defaultView
			),
		};
	}, [ defaultPerPage, defaultView ] );

useEntityListFilterState.propTypes = {
	listId: PropTypes.string.isRequired,
	defaultPerPage: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
	defaultView: PropTypes.string,
};

export default useEntityListFilterState;
