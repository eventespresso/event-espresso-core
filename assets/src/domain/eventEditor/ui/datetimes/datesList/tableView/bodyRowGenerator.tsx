import React from 'react';
import { format } from 'date-fns';
import { createSelector } from 'reselect';

import DateRegistrationsLink from '@edtrUI/datetimes/DateRegistrationsLink';
import DateActionsMenu from '@edtrUI/datetimes/datesList/actionsMenu/DateActionsMenu';
import { Datetime } from '@edtrServices/apollo/types';
import { filterCellByStartOrEndDate, DisplayStartOrEndDate } from '@sharedServices/filterState';
import { ENTITY_LIST_DATE_TIME_FORMAT } from '@appConstants/dateFnsFormats';
import { getBackgroundColorClassName, status } from '@sharedEntities/datetimes/helpers';
import { shortenGuid } from '@appServices/utilities/text';
import DateCapacity from '../cardView/DateCapacity';
import { BodyRowGeneratorFn, BodyRowGeneratorFnProps } from '@appLayout/entityList';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';
import { EditableName } from '../editable';
import { BodyRow } from '@appLayout/espressoTable';

import '@application/ui/styles/root/entity-status.css';

type DFSM = DatetimesFilterStateManager;

type DatesTableBodyRowGenProps = BodyRowGeneratorFnProps<Datetime, DFSM>;

type BodyRowGeneratorSelector<R = any> = (props: DatesTableBodyRowGenProps) => R;

type DatesTableBodyRowGen = BodyRowGeneratorFn<Datetime, DFSM>;

const getDisplayStartOrEndDate: BodyRowGeneratorSelector<DisplayStartOrEndDate> = (props) => {
	return props.filterState.displayStartOrEndDate;
};
const getEntity: BodyRowGeneratorSelector<Datetime> = (props) => props.entity;

const bodyRowGenCombiner = (displayStartOrEndDate: DisplayStartOrEndDate, datetime: Datetime): BodyRow => {
	const bgClassName = getBackgroundColorClassName(datetime);
	const id = datetime.dbId || shortenGuid(datetime.id);
	const statusClassName = status(datetime);

	const capacity = {
		key: 'capacity',
		type: 'cell',
		className: 'ee-date-list-cell ee-date-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
		value: <DateCapacity entity={datetime} />,
	};

	const name = {
		key: 'name',
		type: 'cell',
		className:
			'ee-date-list-cell ee-date-list-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
		value: <EditableName className={'ee-focus-priority-5'} entity={datetime} />,
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

	const cells = cellsData.filter(filterCellByStartOrEndDate(displayStartOrEndDate));

	return {
		cells,
		className: `ee-editor-date-list-view-row ${statusClassName}`,
		id: `ee-editor-date-list-view-row-${datetime.id}`,
		key: `row-${datetime.id}`,
		type: 'row',
	};
};

/**
 * EditorDateEntityListItem
 * Displays Event Date as a table row similar to existing eventEntity editor UI
 */
const bodyRowGenerator: DatesTableBodyRowGen = createSelector<DatesTableBodyRowGenProps, DisplayStartOrEndDate, Datetime, BodyRow>(
	[getDisplayStartOrEndDate, getEntity],
	bodyRowGenCombiner
);

export default bodyRowGenerator;
