/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';

/**
 * DatesListTableHeader
 * header details for the Dates list table
 *
 * @function
 * @return {Array} of Event Date list table header details
 */
const datesListTableHeader = () => {
	return [
		{
			key: 'row',
			type: 'row',
			class: 'ee-editor-date-list-items-header-row',
			value: '',
		},
		{
			key: 'stripe',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-entity-list-status-stripe ee-rspnsv-table-column-micro',
			value: '',
		},
		{
			key: 'id',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-date-list-col-id ee-number-column ee-rspnsv-table-column-tiny',
			value: __( 'ID', 'event_espresso' ),
		},
		{
			key: 'name',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-date-list-col-name ee-rspnsv-table-column-huge',
			value: __( 'Name', 'event_espresso' ),
		},
		{
			key: 'start',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-date-list-col-name-start ee-rspnsv-table-column-default',
			value: (
				<>
					<span className={ 'ee-rspnsv-table-long-label' }>
						{ __( 'Start Date', 'event_espresso' ) }
					</span>
					<span className={ 'ee-rspnsv-table-short-label' }>
						{ __( 'Start', 'event_espresso' ) }
					</span>
				</>
			),
		},
		{
			key: 'end',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-date-list-col-end ee-rspnsv-table-column-default',
			value: (
				<>
					<span className={ 'ee-rspnsv-table-long-label' }>
						{ __( 'End Date', 'event_espresso' ) }
					</span>
					<span className={ 'ee-rspnsv-table-short-label' }>
						{ __( 'End', 'event_espresso' ) }
					</span>
				</>
			),
		},
		{
			key: 'capacity',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-date-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
			value: (
				<>
					<span className={ 'ee-rspnsv-table-long-label' }>
						{ __( 'Capacity', 'event_espresso' ) }
					</span>
					<span className={ 'ee-rspnsv-table-short-label' }>
						{ __( 'Cap', 'event_espresso' ) }
					</span>
				</>
			),
		},
		{
			key: 'sold',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-date-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
			value: __( 'Sold', 'event_espresso' ),
		},
		{
			key: 'reserved',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-date-list-col-reserved ee-rspnsv-table-column-tiny ee-number-column',
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
			key: 'registrants',
			type: 'cell',
			class: 'ee-date-list-col-hdr ee-date-list-col-registrants ee-rspnsv-table-column-smaller ee-centered-column',
			value: (
				<>
					<span className={ 'ee-rspnsv-table-long-label' }>
						{ __( 'Registrants', 'event_espresso' ) }
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
			class: 'ee-date-list-col-hdr ee-date-list-col-actions ee-rspnsv-table-column-big ee-centered-column',
			value: (
				<span className={ 'ee-rspnsv-table-long-label' }>
					{ __( 'Actions', 'event_espresso' ) }
				</span>
			),
		},
	];
};

export default datesListTableHeader;
