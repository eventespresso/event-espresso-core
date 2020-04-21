import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { pluck, last } from 'ramda';

import { useDatetimes } from '@edtrServices/apollo/queries';
import { SelectInput } from '@appInputs/SelectInput';
import { FilterStateManager } from '../filterState';
import { getMonthsListFromDatetimes, getYearMonthForNextDate } from '../../utils';

type DatesByMonthControlProps = Pick<FilterStateManager, 'datesByMonth' | 'setDatesByMonth'>;

const DatesByMonthControl: React.FC<DatesByMonthControlProps> = React.memo(({ datesByMonth, setDatesByMonth }) => {
	const datetimes = useDatetimes();
	const monthsList = getMonthsListFromDatetimes(datetimes);

	// e.g. "2020:4" for May 2020
	const yearMonth = datesByMonth.join(':');

	useEffect(() => {
		/**
		 * It's possible that the month in filter state is not present in the dropdown list,
		 * e.g. when a new event is created, the default date (the only one) is for next month.
		 * In this case we will try to find the immediate next datetime and select its month.
		 */
		// After .flat() it will be like ["2019:11", "2020:2", "2020:3", "2020:4", "2020:9"]
		const yearMonthOptions = monthsList.map(({ options }) => pluck('value', options)).flat();
		if (!yearMonthOptions.includes(yearMonth)) {
			const nextYearMonth = getYearMonthForNextDate(datetimes);

			// if we are lucky to have a next/upcoming month
			if (nextYearMonth) {
				setDatesByMonth(nextYearMonth);
			} else {
				// as a fallback, set the last one (latest) in the list
				setDatesByMonth(last<string>(yearMonthOptions));
			}
		}
	}, []);

	return (
		<SelectInput
			label={__('dates by month')}
			value={yearMonth}
			options={monthsList}
			onChangeValue={setDatesByMonth}
		/>
	);
});

export default DatesByMonthControl;
