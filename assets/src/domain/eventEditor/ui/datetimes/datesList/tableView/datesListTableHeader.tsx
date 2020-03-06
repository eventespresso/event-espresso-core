import React from 'react';
import { __ } from '@wordpress/i18n';

import { DisplayDates } from '@edtrInterfaces/types';
import { displayDatesFilter } from '@appLayout/espressoTable/utils';

/**
 * DatesListTableHeader
 * header details for the Dates list table
 */
const datesListTableHeader = (displayDates: DisplayDates) => {
	const cellsData = [
		{
			key: 'stripe',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-entity-list-status-stripe ee-rspnsv-table-column-micro',
			value: '',
		},
		{
			key: 'id',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-date-list-col-id ee-number-column ee-rspnsv-table-column-tiny',
			value: __('ID', 'event_espresso'),
		},
		{
			key: 'name',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-date-list-col-name ee-rspnsv-table-column-huge',
			value: __('Name', 'event_espresso'),
		},
		{
			key: 'start',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-date-list-col-name-start ee-rspnsv-table-column-default',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Start Date', 'event_espresso')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Start', 'event_espresso')}</span>
				</>
			),
		},
		{
			key: 'end',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-date-list-col-end ee-rspnsv-table-column-default',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('End Date', 'event_espresso')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('End', 'event_espresso')}</span>
				</>
			),
		},
		{
			key: 'capacity',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-date-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Capacity', 'event_espresso')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Cap', 'event_espresso')}</span>
				</>
			),
		},
		{
			key: 'sold',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-date-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
			value: __('Sold', 'event_espresso'),
		},
		{
			key: 'registrations',
			type: 'cell',
			className:
				'ee-date-list-col-hdr ee-date-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Reg list', 'event_espresso')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Regs', 'event_espresso')}</span>
				</>
			),
		},
		{
			key: 'actions',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-date-list-col-actions ee-rspnsv-table-column-big ee-centered-column',
			value: <span className={'ee-rspnsv-table-long-label'}>{__('Actions', 'event_espresso')}</span>,
		},
	];

	const cells = cellsData.filter(displayDatesFilter(displayDates));

	return {
		cells,
		className: 'ee-editor-date-list-items-header-row',
		key: 'dates-list-header',
		primary: true,
		type: 'row',
	};
};

export default datesListTableHeader;
