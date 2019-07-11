/**
 * Internal dependencies
 */
import EditorDateEntityActionsMenu
	from '../actions-menu/editor-date-entity-actions-menu';
import DateEntityRegistrationsLink from '../date-entity-registrations-link';
import { shortenCuid } from '../../../../utils';

const DATE_TIME_FORMAT = 'ddd MMM YY h:mm a';

/**
 * EditorDateEntityListItem
 * Displays Event Date as a table row similar to existing eventEntity editor UI
 *
 * @function
 * @param {Object} dateEntity Event Date entity
 * @param {string} capacity
 * @param {string} statusClass
 * @param {string} bgClass
 * @param {Function} doRefresh
 * @param {Object} otherProps
 * @return {Array} row data for the provided date entity
 */
const datesListTableRow = (
	dateEntity,
	capacity,
	statusClass,
	bgClass,
	doRefresh,
	otherProps
) => {
	return [
		{
			key: 'row',
			type: 'row',
			id: `ee-editor-date-list-view-row-${ dateEntity.id }`,
			class: `ee-editor-date-list-view-row ${ statusClass }`,
			value: '',
		},
		{
			key: 'stripe',
			type: 'cell',
			class: `ee-date-list-cell ee-entity-list-status-stripe ${ bgClass } ee-rspnsv-table-column-micro`,
			value: (
				<div className={ 'ee-rspnsv-table-show-on-mobile' }>
					{ dateEntity.name }
				</div>
			),
		},
		{
			key: 'id',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-id ee-rspnsv-table-column-tiny ee-number-column',
			value: shortenCuid( dateEntity.id ),
		},
		{
			key: 'name',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
			value: dateEntity.name,
		},
		{
			key: 'start',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-start ee-rspnsv-table-column-default',
			value: dateEntity.start.toFormat( DATE_TIME_FORMAT ),
		},
		{
			key: 'end',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-end ee-rspnsv-table-column-default',
			value: dateEntity.end.toFormat( DATE_TIME_FORMAT ),
		},
		{
			key: 'capacity',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
			value: capacity,
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
		{
			key: 'registrants',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-registrants ee-rspnsv-table-column-smaller ee-centered-column',
			value: (
				<DateEntityRegistrationsLink dateEntity={ dateEntity } />
			),
		},
		{
			key: 'actions',
			type: 'cell',
			class: 'ee-date-list-cell ee-date-list-col-actions ee-rspnsv-table-column-big',
			value: (
				<EditorDateEntityActionsMenu
					dateEntity={ dateEntity }
					doRefresh={ doRefresh }
					{ ...otherProps }
				/>
			),
		},
	];
};

export default datesListTableRow;
