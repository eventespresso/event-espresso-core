/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';

/**
 * TicketsListTableHeader
 * header details for the Tickets list table
 *
 * @function
 * @return {Object} of Ticket list table header details
 */
const ticketsListTableHeader = () => {
	return {
		type: 'row',
		primary: true,
		key: 'ticket-header-row',
		class: 'ee-editor-ticket-list-items-header-row',
		cells: [
			{
				key: 'stripe',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-entity-list-status-stripe ee-rspnsv-table-column-micro',
				value: '',
			},
			{
				key: 'id',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-id ee-number-column ee-rspnsv-table-column-tiny',
				value: __( 'ID', 'event_espresso' ),
			},
			{
				key: 'name',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-name ee-rspnsv-table-column-bigger',
				value: __( 'Name', 'event_espresso' ),
			},
			{
				key: 'start',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-name-start ee-rspnsv-table-column-default',
				value: (
					<>
						<span className={ 'ee-rspnsv-table-long-label' }>
							{ __( 'Goes on Sale', 'event_espresso' ) }
						</span>
						<span className={ 'ee-rspnsv-table-short-label' }>
							{ __( 'On Sale', 'event_espresso' ) }
						</span>
					</>
				),
			},
			{
				key: 'end',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-end ee-rspnsv-table-column-default',
				value: (
					<>
						<span className={ 'ee-rspnsv-table-long-label' }>
							{ __( 'Sale Ends', 'event_espresso' ) }
						</span>
						<span className={ 'ee-rspnsv-table-short-label' }>
							{ __( 'Ends', 'event_espresso' ) }
						</span>
					</>
				),
			},
			{
				key: 'price',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column',
				value: __( 'Price', 'event_espresso' ),
			},
			{
				key: 'capacity',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-qty ee-rspnsv-table-column-tiny ee-number-column',
				value: (
					<>
						<span className={ 'ee-rspnsv-table-long-label' }>
							{ __( 'Quantity', 'event_espresso' ) }
						</span>
						<span className={ 'ee-rspnsv-table-short-label' }>
							{ __( 'Qty', 'event_espresso' ) }
						</span>
					</>
				),
			},
			{
				key: 'sold',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
				value: __( 'Sold', 'event_espresso' ),
			},
			{
				key: 'reserved',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-reserved ee-rspnsv-table-column-tiny ee-number-column',
				value: (
					<>
						<span className={ 'ee-rspnsv-table-long-label' }>
							{ __( 'Reserved', 'event_espresso' ) }
						</span>
						<span className={ 'ee-rspnsv-table-short-label' }>
							{ __( 'Rsrvd', 'event_espresso' ) }
						</span>
					</>
				),
			},
			{
				key: 'registrations',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
				value: (
					<>
						<span className={ 'ee-rspnsv-table-long-label' }>
							{ __( 'Registrations', 'event_espresso' ) }
						</span>
						<span className={ 'ee-rspnsv-table-short-label' }>
							{ __( 'Regs', 'event_espresso' ) }
						</span>
					</>
				),
			},
			{
				key: 'actions',
				type: 'cell',
				class: 'ee-ticket-list-col-hdr ee-ticket-list-col-actions ee-rspnsv-table-column-big ee-centered-column',
				value: (
					<span className={ 'ee-rspnsv-table-long-label' }>
						{ __( 'Actions', 'event_espresso' ) }
					</span>
				),
			},
		],
	};
};

export default ticketsListTableHeader;
