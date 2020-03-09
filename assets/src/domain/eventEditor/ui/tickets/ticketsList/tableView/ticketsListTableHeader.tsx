import React from 'react';
import { __ } from '@wordpress/i18n';

import { Cell } from '@appLayout/espressoTable';
import { DisplayStartOrEndDate, filterCellByStartOrEndDate } from '@sharedServices/filterState';

const ticketsListTableHeader = (displayStartOrEndDate: DisplayStartOrEndDate) => {
	const cellsData: Array<Cell> = [
		{
			key: 'stripe',
			type: 'cell',
			className: 'ee-ticket-list-col-hdr ee-entity-list-status-stripe ee-rspnsv-table-column-micro',
			value: '',
		},
		{
			key: 'id',
			type: 'cell',
			className: 'ee-ticket-list-col-hdr ee-ticket-list-col-id ee-number-column ee-rspnsv-table-column-tiny',
			value: __('ID', 'event_espresso'),
		},
		{
			key: 'name',
			type: 'cell',
			className: 'ee-ticket-list-col-hdr ee-ticket-list-col-name ee-rspnsv-table-column-bigger',
			value: __('Name', 'event_espresso'),
		},
		{
			key: 'start',
			type: 'cell',
			className: 'ee-ticket-list-col-hdr ee-ticket-list-col-name-start ee-rspnsv-table-column-default',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Goes on Sale', 'event_espresso')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('On Sale', 'event_espresso')}</span>
				</>
			),
		},
		{
			key: 'end',
			type: 'cell',
			className: 'ee-ticket-list-col-hdr ee-ticket-list-col-end ee-rspnsv-table-column-default',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Sale Ends', 'event_espresso')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Ends', 'event_espresso')}</span>
				</>
			),
		},
		{
			key: 'price',
			type: 'cell',
			className: 'ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column',
			value: __('Price', 'event_espresso'),
		},
		{
			key: 'quantity',
			type: 'cell',
			className:
				'ee-ticket-list-col-hdr ee-ticket-list-col-quantity ee-rspnsv-table-column-tiny ee-number-column',
			value: __('Quantity', 'event_espresso'),
		},
		{
			key: 'sold',
			type: 'cell',
			className: 'ee-ticket-list-col-hdr ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
			value: __('Sold', 'event_espresso'),
		},
		{
			key: 'registrations',
			type: 'cell',
			className:
				'ee-ticket-list-col-hdr ee-ticket-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Registrations', 'event_espresso')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Regs', 'event_espresso')}</span>
				</>
			),
		},
		{
			key: 'actions',
			type: 'cell',
			className:
				'ee-ticket-list-col-hdr ee-ticket-list-col-actions ee-rspnsv-table-column-big ee-centered-column',
			value: <span className={'ee-rspnsv-table-long-label'}>{__('Actions', 'event_espresso')}</span>,
		},
	];

	const cells = cellsData.filter(filterCellByStartOrEndDate(displayStartOrEndDate));

	return {
		cells,
		className: 'ee-editor-ticket-list-items-header-row',
		key: 'ticket-header-row',
		primary: true,
		type: 'row',
	};
};

export default ticketsListTableHeader;
