/**
 * External imports
 */
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";

/**
 * Internal dependencies
 */
import usePaginationConfig from './use-pagination-config';
import './style.css';

/**
 * for adding pagination to an "EntityList" component
 *
 * @param {string} listId - unique identifier for paginated list
 * @param {number} totalCount - total number of entities in full list
 * @param {number} currentPage - page number of currently viewed page
 * @param {number} entitiesPerPage - how many entities on each page
 * @param {Function} setCurrentPage - callback for changing page number
 * @param {number} pageRangeDisplayed - how many pagination links to show
 * @param {Object} paginationConfig - labels for now
 * @return {Object} EntityList with added EntityPagination
 */
const EntityPagination = ( {
	listId,
	totalCount,
	currentPage,
	setCurrentPage,
	entitiesPerPage = 10,
	pageRangeDisplayed = 10,
	paginationConfig = {},
} ) => {
	const pagination = usePaginationConfig( paginationConfig );
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
					firstPageText={ pagination.labels.first }
					prevPageText={ pagination.labels.prev }
					nextPageText={ pagination.labels.next }
					lastPageText={ pagination.labels.last }
				/>
			</div>
		);
};

EntityPagination.propTypes = {
	listId: PropTypes.string.isRequired,
	totalCount: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	setCurrentPage: PropTypes.func.isRequired,
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
