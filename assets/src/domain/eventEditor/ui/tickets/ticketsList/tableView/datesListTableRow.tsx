import React from 'react';
import { format } from 'date-fns';
import { __ } from '@wordpress/i18n';

import DateRegistrationsLink from '@edtrUI/datetimes/DateRegistrationsLink';
import DateActionsMenu from '@edtrUI/datetimes/datesList/actionsMenu/DateActionsMenu';
import { Datetime } from '@edtrServices/apollo/types';
import { DisplayDates } from '@edtrInterfaces/types';
import { ENTITY_LIST_DATE_TIME_FORMAT } from '@appConstants/dateFnsFormats';
import { getBackgroundColorClassName, status } from '@sharedEntities/datetimes/helpers';
import { InlineEditText } from '@appInputs/InlineEditInput';
import { shortenGuid } from '@appServices/utilities/text';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

import '@application/ui/styles/root/entity-status.css';

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
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const capacity = {
		key: 'capacity',
		type: 'cell',
		className: 'ee-date-list-cell ee-date-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
		value: (
			<InlineEditText
				className={'ee-focus-priority-5'}
				onChange={(capacity: string): void => {
					if (capacity !== String(datetime.capacity)) {
						updateEntity({ capacity: Number(capacity) });
					}
				}}
			>
				{datetime.capacity ? datetime.capacity : __('Edit capacity...')}
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
					if (name !== datetime.name) {
						updateEntity({ name });
					}
				}}
			>
				{datetime.name ? datetime.name : __('Edit title...')}
			</InlineEditText>
		),
	};

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
		name,
		{
			key: 'start',
			type: 'cell',
			className: 'ee-date-list-cell ee-date-list-col-start ee-rspnsv-table-column-default',
			value: format(new Date(datetime.startDate), ENTITY_LIST_DATE_TIME_FORMAT),
		},
		{
			key: 'end',
			type: 'cell',
			className: 'ee-date-list-cell ee-date-list-col-end ee-rspnsv-table-column-default',
			value: format(new Date(datetime.endDate), ENTITY_LIST_DATE_TIME_FORMAT),
		},
		capacity,
		{
			key: 'sold',
			type: 'cell',
			className: 'ee-date-list-cell ee-date-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
			value: datetime.sold || 0,
		},
		{
			key: 'registrations',
			type: 'cell',
			className:
				'ee-date-list-cell ee-date-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
			value: <DateRegistrationsLink datetime={datetime} />,
		},
		{
			key: 'actions',
			type: 'cell',
			className: 'ee-date-list-cell ee-date-list-col-actions ee-rspnsv-table-column-big',
			value: <DateActionsMenu entity={datetime} />,
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
		cells,
		className: `ee-editor-date-list-view-row ${statusClassName}`,
		id: `ee-editor-date-list-view-row-${datetime.id}`,
		key: `row-${datetime.id}`,
		type: 'row',
	};
};

export default datesListTableRow;
