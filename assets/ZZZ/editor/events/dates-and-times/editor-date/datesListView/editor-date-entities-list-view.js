/**
 * External imports
 */
import classNames from 'classnames';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import {
	addZebraStripesOnMobile,
	filterColumnsByKey,
	ResponsiveTable,
} from '@eventespresso/components';
import { isModelEntityOfModel } from '@eventespresso/validators';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import datesListTableHeader from './dates-list-table-header';
import datesListTableRow from './dates-list-table-row';
import useReorderDates from './use-reorder-dates';
import './editor-date-entities-list-view.css';

const noZebraStripe = [ 'row', 'stripe', 'name', 'actions' ];

/**
 * EditorDateEntitiesListView
 * Displays event date details in a standard list table like view
 *
 * @function
 * @param {Object} props
 * @member {Array} entities         filtered array of Event Date model objects
 * @member {Array} allEventDates    array of ALL Event Date model objects
 * @member {string} showDate
 * @member {string} htmlClass
 * @member {Object} otherProps
 * @return {Object} rendered table of Event Dates
 */
const EditorDateEntitiesListView = ( {
	entities,
	allEventDates,
	showDate,
	setEntityIds,
	setSortBy,
	htmlClass,
	...otherProps
} ) => {
	const reorderDates = useReorderDates(
		entities,
		allEventDates,
		setEntityIds,
		setSortBy
	);

	/**
	 * toggles display of start and end date columns
	 * based on incoming value of showDate
	 *
	 * @function
	 * @return {Function} cached callback
	 */
	const filterColumns = useCallback(
		/**
		 * @function
		 * @param {Object} columns
		 * @return {Object} columns
		 */
		( columns ) => {
			const colSwap = { start: 'end', end: 'start' };
			const exclude = colSwap[ showDate ] ? colSwap[ showDate ] : '';
			columns.cells = filterColumnsByKey( columns.cells, exclude );
			return columns;
		},
		[ showDate ]
	);

	const formRows = entities.map(
		/**
		 * @function
		 * @param {Object} dateEntity
		 * @return {Array} columns
		 */
		( dateEntity ) => {
			const columns = isModelEntityOfModel( dateEntity, 'datetime' ) ?
				datesListTableRow( dateEntity, otherProps ) :
				null;
			return filterColumns( columns );
		}
	);

	htmlClass = classNames( htmlClass, 'ee-dates-list-list-view' );

	return (
		<ResponsiveTable
			headerRows={ [ filterColumns( datesListTableHeader() ) ] }
			tableRows={ addZebraStripesOnMobile( formRows, noZebraStripe ) }
			metaData={ {
				tableId: 'date-entities-list-view',
				tableCaption: __( 'Event Dates', 'event_espresso' ),
			} }
			classes={ { tableClass: htmlClass } }
			onDragEnd={ reorderDates }
		/>
	);
};

EditorDateEntitiesListView.propTypes = {
	entities: PropTypes.array.isRequired,
	allEventDates: PropTypes.array.isRequired,
	showDate: PropTypes.string,
	htmlClass: PropTypes.string,
	doRefresh: PropTypes.func,
};

EditorDateEntitiesListView.defaultProps = {
	showDate: '',
	htmlClass: '',
};

export default EditorDateEntitiesListView;
