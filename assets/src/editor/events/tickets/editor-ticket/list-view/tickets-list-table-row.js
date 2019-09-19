/**
 * External imports
 */
import { shortenCuid } from '@eventespresso/utils';

/**
 * Internal dependencies
 */
import EditorTicketActionsMenu
	from '../../../tickets/editor-ticket/actions-menu/editor-ticket-actions-menu';

const DATE_TIME_FORMAT = 'ddd MMM YY h:mm a';

/**
 * ticketsListTableRow
 * Displays Ticket as a table row similar to existing eventEntity editor UI
 *
 * @function
 * @param {Object} ticketEntity Event Date entity
 * @param {string} quantity
 * @param {string} statusClass
 * @param {string} bgClass
 * @param {Object} otherProps
 * @return {Array} row data for the provided ticket entity
 */
const ticketsListTableRow = (
	ticketEntity,
	quantity,
	statusClass,
	bgClass,
	otherProps
) => {
	return [
		{
			key: 'row',
			type: 'row',
			id: `ee-editor-ticket-list-view-row-${ ticketEntity.id }`,
			class: `ee-editor-ticket-list-view-row ${ statusClass }`,
			value: '',
		},
		{
			key: 'stripe',
			type: 'cell',
			class: `ee-ticket-list-cell ee-entity-list-status-stripe ${ bgClass } ee-rspnsv-table-column-micro`,
			value: (
				<div className={ 'ee-rspnsv-table-show-on-mobile' }>
					{ ticketEntity.name }
				</div>
			),
		},
		{
			key: 'id',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-id ee-rspnsv-table-column-tiny ee-number-column',
			value: shortenCuid( ticketEntity.id ),
		},
		{
			key: 'name',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
			value: ticketEntity.name,
		},
		{
			key: 'price',
			type: 'cell',
			class: 'ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column',
			value: ticketEntity.price.formatter.formatMoney(
				ticketEntity.price.amount,
				ticketEntity.price.formatter.settings
			),
		},
		{
			key: 'start',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-start ee-rspnsv-table-column-default',
			value: ticketEntity.startDate.toFormat( DATE_TIME_FORMAT ),
		},
		{
			key: 'end',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-end ee-rspnsv-table-column-default',
			value: ticketEntity.endDate.toFormat( DATE_TIME_FORMAT ),
		},
		{
			key: 'quantity',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
			value: quantity,
		},
		{
			key: 'sold',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
			value: ticketEntity.sold,
		},
		{
			key: 'reserved',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-reserved ee-rspnsv-table-column-tiny ee-number-column',
			value: ticketEntity.reserved,
		},
		{
			key: 'registrants',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-registrants ee-rspnsv-table-column-smaller ee-centered-column',
			value: ticketEntity.sold, // should be count of related registrations
		},
		{
			key: 'actions',
			type: 'cell',
			class: 'ee-ticket-list-cell ee-ticket-list-col-actions ee-rspnsv-table-column-big',
			value: (
				<EditorTicketActionsMenu
					ticketEntity={ ticketEntity }
					{ ...otherProps }
				/>
			),
		},
	];
};

export default ticketsListTableRow;
