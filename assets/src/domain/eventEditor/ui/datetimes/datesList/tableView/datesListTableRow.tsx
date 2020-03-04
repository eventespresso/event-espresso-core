import React from 'react';
import { format } from 'date-fns';

import { Datetime } from '../../../../services/apollo/types';
import { getBackgroundColorClassName, status } from '@sharedEntities/datetimes/helpers';
import { shortenGuid } from '@appServices/utilities/text';
import '../../../../../../application/ui/styles/root/entity-status.css';

const DATE_TIME_FORMAT = 'EEE MMM yy h:mm a';

/**
 * EditorDateEntityListItem
 * Displays Event Date as a table row similar to existing eventEntity editor UI
 */
const datesListTableRow = (dateEntity: Datetime, otherProps) => {
	const bgClassName = getBackgroundColorClassName(dateEntity);
	const id = dateEntity.dbId || shortenGuid(dateEntity.id);
	const statusClassName = status(dateEntity);

	return {
		key: `row-${dateEntity.id}`,
		type: 'row',
		id: `ee-editor-date-list-view-row-${dateEntity.id}`,
		className: `ee-editor-date-list-view-row ${statusClassName}`,
		cells: [
			{
				key: 'stripe',
				type: 'cell',
				className: `ee-date-list-cell ee-entity-list-status-stripe ${bgClassName} ee-rspnsv-table-column-micro`,
				value: <div className={'ee-rspnsv-table-show-on-mobile'}>{dateEntity.name}</div>,
			},
			{
				key: 'id',
				type: 'cell',
				className: 'ee-date-list-cell ee-date-list-col-id ee-rspnsv-table-column-tiny ee-number-column',
				value: id,
			},
			{
				key: 'name',
				type: 'cell',
				className:
					'ee-date-list-cell ee-date-list-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
				value: dateEntity.name,
			},
			{
				key: 'start',
				type: 'cell',
				class: 'ee-date-list-cell ee-date-list-col-start ee-rspnsv-table-column-default',
				value: format(new Date(dateEntity.startDate), DATE_TIME_FORMAT),
			},
			{
				key: 'end',
				type: 'cell',
				class: 'ee-date-list-cell ee-date-list-col-end ee-rspnsv-table-column-default',
				value: format(new Date(dateEntity.endDate), DATE_TIME_FORMAT),
			},
			{
				key: 'sold',
				type: 'cell',
				className: 'ee-date-list-cell ee-date-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
				value: dateEntity.sold,
			},
			{
				key: 'reserved',
				type: 'cell',
				className: 'ee-date-list-cell ee-date-list-col-reserved ee-rspnsv-table-column-tiny ee-number-column',
				value: dateEntity.reserved,
			},
		],
	};
};

export default datesListTableRow;
