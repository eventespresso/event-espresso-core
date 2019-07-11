/**
 * External imports
 */
import classNames from 'classnames';
import { useCallback } from '@wordpress/element';
import {
	addZebraStripesOnMobile,
	filterColumnsByKey,
	ResponsiveTable,
} from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import ticketsListTableHeader from './tickets-list-table-header';
import ticketsListTableRow from './tickets-list-table-row';
import './editor-ticket-entities-list-view.css';

const { getBackgroundColorClass, status } = ticketModel;
const noZebraStripe = [ 'row', 'stripe', 'name', 'actions' ];

/**
 * EditorTicketsListView
 * Displays tickets in a standard list table like view
 *
 * @function
 * @param {Array} entities 	array of JSON objects defining the Tickets
 * @param {string} displayTicketDate
 * @param {string} htmlClass
 * @param {Function} doRefresh
 * @param {Object} otherProps
 * @return {Component} 			list of rendered Tickets
 */
const EditorTicketEntitiesListView = ( {
	entities,
	displayTicketDate,
	htmlClass,
	doRefresh,
	...otherProps
} ) => {
	htmlClass = classNames( htmlClass, 'ee-tickets-list-list-view' );
	const getQuantity = useCallback(
		/**
		 * @function
		 * @param {number|string} qty
		 * @return {number|string} number of available tickets
		 */
		( qty ) => {
			qty = parseInt( qty, 10 ) || -1;
			return qty === -1 || qty === Infinity ?
				<span className={ 'ee-infinity-sign' }>&infin;</span> :
				qty;
		},
		[]
	);

	/**
	 * toggles display of start and end date columns
	 * based on incoming value of showDate
	 *
	 * @function
	 * @param {Array} columns
	 * @return {Array} columns
	 */
	const filterColumns = ( columns ) => {
		const colSwap = { start: 'end', end: 'start' };
		const exclude = colSwap[ displayTicketDate ] ?
			colSwap[ displayTicketDate ] :
			'';
		return filterColumnsByKey( columns, exclude );
	};

	const formRows = entities.map(
		/**
		 * @function
		 * @param {Object} ticketEntity
		 * @return {Array} columns
		 */
		( ticketEntity ) => {
			const columns = isModelEntityOfModel( ticketEntity, 'ticket' ) ?
				ticketsListTableRow(
					ticketEntity,
					getQuantity( ticketEntity.regLimit ),
					status( ticketEntity ),
					getBackgroundColorClass( ticketEntity ),
					doRefresh,
					otherProps
				) : null;
			return filterColumns( columns );
		}
	);

	return (
		<ResponsiveTable
			columns={ filterColumns( ticketsListTableHeader() ) }
			rowData={ addZebraStripesOnMobile( formRows, noZebraStripe ) }
			metaData={ {
				tableCaption: __( 'Tickets', 'event_espresso' ),
			} }
			classes={ { tableClass: htmlClass } }
		/>
	);
};

export default EditorTicketEntitiesListView;
