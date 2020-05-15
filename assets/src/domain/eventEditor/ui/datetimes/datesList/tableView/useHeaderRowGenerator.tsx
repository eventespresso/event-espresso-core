import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Cell } from '@appLayout/espressoTable';
import { filterCellByStartOrEndDate } from '@sharedServices/filterState';
import { HeaderRowGeneratorFn } from '@appLayout/entityList';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';

type DatesTableHeaderRowGen = HeaderRowGeneratorFn<DatetimesFilterStateManager>;

const useHeaderRowGenerator = (): DatesTableHeaderRowGen => {
	return useCallback<DatesTableHeaderRowGen>((filterState) => {
		const { displayStartOrEndDate } = filterState;

		const cellsData: Array<Cell> = [
			{
				key: 'stripe',
				type: 'cell',
				className: 'ee-date-list-col-hdr ee-entity-list-status-stripe ee-rspnsv-table-column-nano',
				value: '',
			},
			{
				key: 'id',
				type: 'cell',
				className: 'ee-date-list-col-hdr ee-date-list-col-id ee-number-column ee-rspnsv-table-column-nano',
				value: __('ID'),
			},
			{
				key: 'name',
				type: 'cell',
				className: 'ee-date-list-col-hdr ee-date-list-col-name ee-rspnsv-table-column-huge',
				value: __('Name'),
			},
			{
				key: 'start',
				type: 'cell',
				className: 'ee-date-list-col-hdr ee-date-list-col-name-start ee-rspnsv-table-column-default',
				value: (
					<>
						<span className={'ee-rspnsv-table-long-label'}>{__('Start Date')}</span>
						<span className={'ee-rspnsv-table-short-label'}>{__('Start')}</span>
					</>
				),
			},
			{
				key: 'end',
				type: 'cell',
				className: 'ee-date-list-col-hdr ee-date-list-col-end ee-rspnsv-table-column-default',
				value: (
					<>
						<span className={'ee-rspnsv-table-long-label'}>{__('End Date')}</span>
						<span className={'ee-rspnsv-table-short-label'}>{__('End')}</span>
					</>
				),
			},
			{
				key: 'capacity',
				type: 'cell',
				className:
					'ee-date-list-col-hdr ee-date-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
				value: (
					<>
						<span className={'ee-rspnsv-table-long-label'}>{__('Capacity')}</span>
						<span className={'ee-rspnsv-table-short-label'}>{__('Cap')}</span>
					</>
				),
			},
			{
				key: 'sold',
				type: 'cell',
				className: 'ee-date-list-col-hdr ee-date-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
				value: __('Sold'),
			},
			{
				key: 'registrations',
				type: 'cell',
				className:
					'ee-date-list-col-hdr ee-date-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
				value: (
					<>
						<span className={'ee-rspnsv-table-long-label'}>{__('Reg list')}</span>
						<span className={'ee-rspnsv-table-short-label'}>{__('Regs')}</span>
					</>
				),
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-date-list-col-hdr ee-actions-column ee-rspnsv-table-column-big ee-centered-column',
				value: (
					<>
						<span className={'ee-rspnsv-table-long-label'}>{__('Actions')}</span>
						<span className={'ee-rspnsv-table-short-label'}>{__('Actions')}</span>
					</>
				),
			},
		];

		const cells = cellsData.filter(filterCellByStartOrEndDate(displayStartOrEndDate));

		return {
			cells,
			className: 'ee-editor-date-list-items-header-row',
			key: 'dates-list-header',
			primary: true,
			type: 'row',
		};
	}, []);
};

export default useHeaderRowGenerator;
