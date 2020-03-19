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

	return (
		<SelectInput
			label={__('dates by month')}
			value={datesByMonth.join(':')}
			options={monthsList}
			onChange={setDatesByMonth}
		/>
	);
});

export default DatesByMonthControl;
