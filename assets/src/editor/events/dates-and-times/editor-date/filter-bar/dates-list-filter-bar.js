/**
 * External imports
 */
import PropTypes from 'prop-types';
import { EntityListFilterBar } from '@eventespresso/components';

import DatesListEntityFilters from './dates-list-entity-filters';

/**
 * DatesListFilterBar
 * filters for controlling the display of a list of Event Dates
 *
 * @param {string} listId
 * @param {string} showDates
 * @param {string} datesSortedBy
 * @param {string} displayDates
 * @param {string} searchText
 * @param {number} perPage
 * @param {string} view

 * @return {Object} EditorDatesListView with added DateListFilters
 */
const DatesListFilterBar = ( {
	listId,
	showDates,
	datesSortedBy,
	displayDates,
	searchText,
	perPage,
	view,
} ) => {
	return (
		<EntityListFilterBar
			listId={ listId }
			view={ view }
			perPage={ perPage }
			searchText={ searchText }
			entityFilters={
				<DatesListEntityFilters
					listId={ listId }
					showDates={ showDates }
					datesSortedBy={ datesSortedBy }
					displayDates={ displayDates }
				/>
			}
		/>
	);
};

DatesListFilterBar.propTypes = {
	listId: PropTypes.string.isRequired,
	showDates: PropTypes.string,
	datesSortedBy: PropTypes.string,
	displayDates: PropTypes.string,
	searchText: PropTypes.string,
	perPage: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
	view: PropTypes.string,
};

export default DatesListFilterBar;
