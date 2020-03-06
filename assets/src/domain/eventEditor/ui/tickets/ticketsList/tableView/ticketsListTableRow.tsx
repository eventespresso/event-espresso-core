import React from 'react';
import { format } from 'date-fns';
import { __ } from '@wordpress/i18n';

import DateRegistrationsLink from '@edtrUI/datetimes/DateRegistrationsLink';
import DateActionsMenu from '@edtrUI/datetimes/datesList/actionsMenu/DateActionsMenu';

import { displayDatesFilter } from '@appLayout/espressoTable/utils';
import { DisplayDates } from '@edtrInterfaces/types';
import { ENTITY_LIST_DATE_TIME_FORMAT } from '@appConstants/dateFnsFormats';
import { getBackgroundColorClassName, status } from '@sharedEntities/tickets/helpers';
import { InlineEditText } from '@appInputs/InlineEditInput';
import { shortenGuid } from '@appServices/utilities/text';
import { Ticket } from '@edtrServices/apollo/types';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

import '@application/ui/styles/root/entity-status.css';

interface Props {
	ticket: Ticket;
	displayDates: DisplayDates;
}

const ticketsListTableRow = ({ ticket, displayDates }: Props) => {
	const bgClassName = getBackgroundColorClassName(ticket);
	const id = ticket.dbId || shortenGuid(ticket.id);
	const statusClassName = status(ticket);
	const { updateEntity } = useDatetimeMutator(ticket.id);

	const capacity = {
		key: 'capacity',
		type: 'cell',
		className: 'ee-date-list-cell ee-date-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
		value: (
			<InlineEditText
				className={'ee-focus-priority-5'}
				onChange={(capacity: string): void => {
					if (capacity !== String(ticket.capacity)) {
						updateEntity({ capacity: Number(capacity) });
					}
				}}
			>
				{ticket.capacity ? ticket.capacity : __('Edit capacity...')}
			</InlineEditText>
		),
	};

	const name = {
		key: 'name',
		type: 'cell',
		className:
			'ee-date-list-cell ee-date-list-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
		value: (
			<InlineEditText
				className={'ee-focus-priority-5'}
				onChange={(name: string): void => {
					if (name !== ticket.name) {
						updateEntity({ name });
					}
				}}
			>
				{ticket.name ? ticket.name : __('Edit title...')}
			</InlineEditText>
		),
	};

	const quantity = {
		key: 'capacity',
		type: 'cell',
		className: 'ee-ticket-list-cell ee-ticket-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
		value: (
			<InlineEditText
				className={'ee-focus-priority-5'}
				onChange={(capacity: string): void => {
					if (capacity !== String(ticket.capacity)) {
						updateEntity({ capacity: Number(capacity) });
					}
				}}
			>
				{ticket.capacity ? ticket.capacity : __('Edit capacity...')}
			</InlineEditText>
		),
	};

	const cellsData = [
		{
			key: 'stripe',
			type: 'cell',
			className: `ee-ticket-list-cell ee-entity-list-status-stripe ${bgClass} ee-rspnsv-table-column-micro`,
			value: <div className={'ee-rspnsv-table-show-on-mobile'}>{ticket.name}</div>,
		},
		{
			key: 'id',
			type: 'cell',
			className: 'ee-ticket-list-cell ee-ticket-list-col-id ee-rspnsv-table-column-tiny ee-number-column',
			value: shortenCuid(ticket.id),
		},
		{
			key: 'name',
			type: 'cell',
			className:
				'ee-ticket-list-cell ee-ticket-list-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
			value: ticket.name,
		},
		{
			key: 'start',
			type: 'cell',
			className: 'ee-ticket-list-cell ee-ticket-list-col-start ee-rspnsv-table-column-default',
			value: format(new Date(ticket.startDate), ENTITY_LIST_DATE_TIME_FORMAT),
		},
		{
			key: 'end',
			type: 'cell',
			className: 'ee-ticket-list-cell ee-ticket-list-col-end ee-rspnsv-table-column-default',
			value: format(new Date(ticket.endDate), ENTITY_LIST_DATE_TIME_FORMAT),
		},
		{
			key: 'price',
			type: 'cell',
			className: 'ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column',
			value: ticket.price.formatter.formatMoney(ticket.price.amount, ticket.price.formatter.settings),
		},
		quantity,
		{
			key: 'sold',
			type: 'cell',
			className: 'ee-ticket-list-cell ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
			value: ticket.sold,
		},
		{
			key: 'actions',
			type: 'cell',
			className: 'ee-ticket-list-cell ee-ticket-list-col-actions ee-rspnsv-table-column-big',
			value: <EditorTicketActionsMenu ticketEntity={ticketEntity} {...otherProps} />,
		},
	];

	const cells = cellsData.filter(displayDatesFilter(displayDates));

	return {
		cells,
		className: `ee-editor-date-list-view-row ${statusClassName}`,
		id: `ee-editor-date-list-view-row-${ticket.id}`,
		key: `row-${ticket.id}`,
		type: 'row',
	};
};

export default ticketsListTableRow;
