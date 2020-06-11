import React from 'react';
import { __ } from '@wordpress/i18n';

import { useDatetimes } from '@edtrServices/apollo/queries';
import { SelectInput } from '@appInputs/SelectInput';
import { FilterStateManager } from '../filterState';
import { getMonthsListFromDatetimes } from '../../utils';

type DatesByMonthControlProps = Pick<FilterStateManager, 'datesByMonth' | 'setDatesByMonth'>;

const DatesByMonthControl: React.FC<DatesByMonthControlProps> = React.memo(({ datesByMonth, setDatesByMonth }) => {
	const datetimes = useDatetimes();
	const monthsList = getMonthsListFromDatetimes(datetimes);

	// e.g. "2020:4" for May 2020
	const yearMonth = datesByMonth.join(':');

	// Add all dates option at the top, "0:0" to match the "year:month" format
	const monthsListWithAllDates = [{ value: '0:0', label: __('All Dates') }, ...monthsList];

	return (
		<SelectInput
			label={__('dates by month')}
			value={yearMonth}
			options={monthsListWithAllDates}
			onChangeValue={setDatesByMonth}
		/>
	);
});

export default DatesByMonthControl;
