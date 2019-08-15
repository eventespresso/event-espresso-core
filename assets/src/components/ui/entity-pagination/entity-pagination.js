/**
 * External imports
 */
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";

/**
 * Internal dependencies
 */
import './style.css';
import useEntityPagination from './use-entity-pagination';
import usePaginationConfig from './use-pagination-config';

const nullFunc = () => null;

/**
 * for adding pagination to an "EntityList" component
 *
 * @param {string} listId
 * @param {number} totalCount
 * @param {number} entitiesPerPage
 * @param {number} pageRangeDisplayed
 * @param {Object} paginationConfig
 * @return {Object} EntityList with added EntityPagination
 */
const EntityPagination = ( {
	listId,
	totalCount = 0,
	entitiesPerPage = 10,
	pageRangeDisplayed = 10,
	paginationConfig = {},
} ) => {
	const { currentPage, setCurrentPage } = useEntityPagination( listId );
	paginationConfig = usePaginationConfig( paginationConfig );
	return totalCount > entitiesPerPage && (
			<div id={ `ee-entity-pagination-${ listId }` }
				className="ee-entity-pagination"
			>
				<Pagination
					key={ listId }
					activePage={ currentPage }
					itemsCountPerPage={ entitiesPerPage }
					totalItemsCount={ totalCount }
					pageRangeDisplayed={ pageRangeDisplayed }
					onChange={ setCurrentPage }
					firstPageText={ paginationConfig.labels.first }
					prevPageText={ paginationConfig.labels.prev }
					nextPageText={ paginationConfig.labels.next }
					lastPageText={ paginationConfig.labels.last }
				/>
			</div>
		);
};

EntityPagination.propTypes = {
	listId: PropTypes.string.isRequired,
	totalCount: PropTypes.number.isRequired,
	entitiesPerPage: PropTypes.number,
	pageRangeDisplayed: PropTypes.number,
	paginationConfig: PropTypes.shape( {
		labels: PropTypes.shape( {
			first: PropTypes.string,
			last: PropTypes.string,
			prev: PropTypes.string,
			next: PropTypes.string,
		} ),
	} ),
};

export default EntityPagination;
