/**
 * External imports
 */
import classNames from 'classnames';
import { useCallback } from '@wordpress/element';
import { addZebraStripesOnMobile, filterColumnsByKey, ResponsiveTable } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ticketsListTableHeader from './tickets-list-table-header';
import ticketsListTableRow from './tickets-list-table-row';
import useReorderTickets from './use-reorder-tickets';
import './editor-ticket-entities-list-view.css';
import useTicketsRegistrationCount from '../../../../../../../ZZZ/editor/events/tickets/editor-ticket/use-tickets-registration-count';

const noZebraStripe = ['row', 'stripe', 'name', 'actions'];

/**
 * EditorTicketsListView
 * Displays tickets in a standard list table like view
 *
 * @function
 * @param {Object} props
 * @member {Array} entities  filtered array of Ticket model objects
 * @member {Array} tickets   array of ALL Ticket model objects
 * @member {string} displayTicketDate
 * @member {string} htmlClass
 * @member {Object} otherProps
 * @return {Object} rendered table of Tickets
 */
const EditorTicketEntitiesListView = ({
	entities,
	allTickets,
	displayTicketDate,
	setEntityIds,
	setSortBy,
	htmlClass,
	...otherProps
}) => {
	const reorderTickets = useReorderTickets(entities, allTickets, setEntityIds, setSortBy);
	const registrationCounts = useTicketsRegistrationCount();
	/**
	 * toggles display of start and end date columns
	 * based on incoming value of showDate
	 *
	 * @function
	 * @param {Array} columns
	 * @return {Array} columns
	 */
	const filterColumns = useCallback(
		(columns) => {
			const colSwap = { start: 'end', end: 'start' };
			const exclude = colSwap[displayTicketDate] ? colSwap[displayTicketDate] : '';
			return filterColumnsByKey(columns, exclude);
		},
		[displayTicketDate]
	);

	const formRows = entities.map(
		/**
		 * @function
		 * @param {Object} ticketEntity
		 * @return {Array} columns
		 */
		(ticketEntity) => {
			const columns = isModelEntityOfModel(ticketEntity, 'ticket')
				? ticketsListTableRow(ticketEntity, otherProps, registrationCounts[ticketEntity.id] || 0)
				: null;
			return filterColumns(columns);
		}
	);

	htmlClass = classNames(htmlClass, 'ee-tickets-list-list-view');
	return (
		<ResponsiveTable
			headerRows={[filterColumns(ticketsListTableHeader())]}
			tableRows={addZebraStripesOnMobile(formRows, noZebraStripe)}
			metaData={{
				tableId: 'ticket-entities-list-view',
				tableCaption: __('Tickets', 'event_espresso'),
			}}
			classes={{ tableClass: htmlClass }}
			onDragEnd={reorderTickets}
		/>
	);
};

EditorTicketEntitiesListView.propTypes = {
	entities: PropTypes.array.isRequired,
	allTickets: PropTypes.array.isRequired,
	displayTicketDate: PropTypes.string,
	htmlClass: PropTypes.string,
};

EditorTicketEntitiesListView.defaultProps = {
	htmlClass: '',
};

export default EditorTicketEntitiesListView;
