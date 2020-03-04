import React from 'react';
import { format } from 'date-fns';

import { Datetime } from '../../../../services/apollo/types';
import { DisplayDates } from '../../../../interfaces/datetimes/types';
import { getBackgroundColorClassName, status } from '@sharedEntities/datetimes/helpers';
import { shortenGuid } from '@appServices/utilities/text';
import '../../../../../../application/ui/styles/root/entity-status.css';

const DATE_TIME_FORMAT = 'EEE MMM yy h:mm a';

interface Props {
	datetime: Datetime;
	displayDates: DisplayDates;
}

/**
 * EditorDateEntityListItem
 * Displays Event Date as a table row similar to existing eventEntity editor UI
 */
const datesListTableRow = ({ datetime, displayDates }: Props) => {
	const bgClassName = getBackgroundColorClassName(datetime);
	const id = datetime.dbId || shortenGuid(datetime.id);
	const statusClassName = status(datetime);

	const cellsData = [
		{
			key: 'stripe',
			type: 'cell',
			className: `ee-date-list-cell ee-entity-list-status-stripe ${bgClassName} ee-rspnsv-table-column-micro`,
			value: <div className={'ee-rspnsv-table-show-on-mobile'}>{datetime.name}</div>,
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
			value: datetime.name,
		},
		{
			key: 'start',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-start ee-rspnsv-table-column-default',
			value: format(new Date(datetime.startDate), DATE_TIME_FORMAT),
		},
		{
			key: 'end',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-end ee-rspnsv-table-column-default',
			value: format(new Date(datetime.endDate), DATE_TIME_FORMAT),
		},
		{
			key: 'sold',
			type: 'cell',
			className: 'ee-date-list-cell ee-date-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
			value: datetime.sold,
		},
		{
			key: 'reserved',
			type: 'cell',
			className: 'ee-date-list-cell ee-date-list-col-reserved ee-rspnsv-table-column-tiny ee-number-column',
			value: datetime.reserved,
		},
	];

	const cells = cellsData.filter((cell) => {
		if (displayDates === DisplayDates.start && cell.key === 'end') {
			return null;
		}

		if (displayDates === DisplayDates.end && cell.key === 'start') {
			return null;
		}

		return cell;
	});

	return {
		key: `row-${datetime.id}`,
		type: 'row',
		id: `ee-editor-date-list-view-row-${datetime.id}`,
		className: `ee-editor-date-list-view-row ${statusClassName}`,
		cells,
	};
};

export default datesListTableRow;
