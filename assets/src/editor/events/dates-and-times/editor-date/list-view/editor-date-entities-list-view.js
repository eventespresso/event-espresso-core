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
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { InfinitySymbol } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import datesListTableHeader from './dates-list-table-header';
import datesListTableRow from './dates-list-table-row';
import './editor-date-entities-list-view.css';

const { getBackgroundColorClass, status } = dateTimeModel;
const noZebraStripe = [ 'row', 'stripe', 'name', 'actions' ];

/**
 * EditorDateEntitiesListView
 * Displays event date details in a standard list table like view
 *
 * @function
 * @param {Array} entities 	array of JSON objects defining the Event Dates
 * @param {string} showDate
 * @param {string} htmlClass
 * @param {Function} doRefresh
 * @param {Object} otherProps
 * @return {Component} 			list of rendered Event Dates
 */
const EditorDateEntitiesListView = ( {
	entities,
	showDate,
	htmlClass,
	doRefresh,
	...otherProps
} ) => {
	htmlClass = classNames( htmlClass, 'ee-dates-list-list-view' );

	const getCapacity = useCallback(
		/**
		 * @function
		 * @param {number|string} cap AKA reg limit
		 * @return {number|string} Event Date Capacity
		 */
		( cap ) => <InfinitySymbol value={ cap } asInt />,
		[]
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
		 * @param {Array} columns
		 * @return {Array} columns
		 */
		( columns ) => {
			const colSwap = { start: 'end', end: 'start' };
			const exclude = colSwap[ showDate ] ? colSwap[ showDate ] : '';
			return filterColumnsByKey( columns, exclude );
		},
		[]
	);

	const formRows = entities.map(
		/**
		 * @function
		 * @param {Object} dateEntity
		 * @return {Array} columns
		 */
		( dateEntity ) => {
			const columns = isModelEntityOfModel( dateEntity, 'datetime' ) ?
				datesListTableRow(
					dateEntity,
					getCapacity( dateEntity.regLimit ),
					status( dateEntity ),
					getBackgroundColorClass( dateEntity ),
					doRefresh,
					otherProps
				) : null;
			return filterColumns( columns );
		}
	);

	return (
		<ResponsiveTable
			columns={ filterColumns( datesListTableHeader() ) }
			rowData={ addZebraStripesOnMobile( formRows, noZebraStripe ) }
			metaData={ {
				tableCaption: __( 'Event Dates', 'event_espresso' ),
			} }
			classes={ { tableClass: htmlClass } }
		/>
	);
};

export default EditorDateEntitiesListView;
