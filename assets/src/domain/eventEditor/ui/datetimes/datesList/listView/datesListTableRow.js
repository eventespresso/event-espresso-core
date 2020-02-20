import React from 'react';
const DATE_TIME_FORMAT = 'ddd MMM YY h:mm a';
// const { getBackgroundColorClass, status } = dateTimeModel;

/**
 * EditorDateEntityListItem
 * Displays Event Date as a table row similar to existing eventEntity editor UI
 *
 * @function
 * @param {Object} dateEntity Event Date entity
 * @param {Object} otherProps
 * @return {Object} row data for the provided date entity
 */
const datesListTableRow = (dateEntity, otherProps) => {
	// const statusClass = status(dateEntity);
	const statusClass = 'statusClass';
	// const bgClass = getBackgroundColorClass(dateEntity);
	const bgClass = 'bgClass';
	return {
		key: `row-${dateEntity.id}`,
		type: 'row',
		id: `ee-editor-date-list-view-row-${dateEntity.id}`,
		class: `ee-editor-date-list-view-row ${statusClass}`,
		cells: [
			{
				key: 'stripe',
				type: 'cell',
				class: `ee-date-list-cell ee-entity-list-status-stripe ${bgClass} ee-rspnsv-table-column-micro`,
				value: <div className={'ee-rspnsv-table-show-on-mobile'}>{dateEntity.name}</div>,
			},
			{
				key: 'id',
				type: 'cell',
				class: 'ee-date-list-cell ee-date-list-col-id ee-rspnsv-table-column-tiny ee-number-column',
				value: dateEntity.id,
			},
			{
				key: 'name',
				type: 'cell',
				class:
					'ee-date-list-cell ee-date-list-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
				value: dateEntity.name,
			},
			{
				key: 'sold',
				type: 'cell',
				class: 'ee-date-list-cell ee-date-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
				value: dateEntity.sold,
			},
			{
				key: 'reserved',
				type: 'cell',
				class: 'ee-date-list-cell ee-date-list-col-reserved ee-rspnsv-table-column-tiny ee-number-column',
				value: dateEntity.reserved,
			},
		],
	};
};

export default datesListTableRow;
