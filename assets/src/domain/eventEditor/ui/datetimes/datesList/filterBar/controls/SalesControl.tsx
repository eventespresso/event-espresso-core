import React from 'react';
import { __ } from '@wordpress/i18n';

import { SelectInput } from '@appInputs/SelectInput';
import { DatetimeSales } from '@edtrServices/filterState';

interface StatusControlProps {
	sales: DatetimeSales;
	setSales: (sales: DatetimeSales) => void;
}

const SalesControl: React.FC<StatusControlProps> = React.memo(({ sales, setSales }) => {
	return (
		<SelectInput
			label={__('sales')}
			className='espresso-date-list-filter-bar-show-select ee-filter-bar-filter--big'
			value={sales}
			options={[
				{
					value: DatetimeSales.all,
					label: __('all dates'),
				},
				{
					value: DatetimeSales.above90Capacity,
					label: __('dates above 90% capacity'),
				},
				{
					value: DatetimeSales.above75Capacity,
					label: __('dates above 75% capacity'),
				},
				{
					value: DatetimeSales.above50Capacity,
					label: __('dates above 50% capacity'),
				},
				{
					value: DatetimeSales.below50Capacity,
					label: __('dates below 50% capacity'),
				},
			]}
			onChange={setSales}
		/>
	);
});

export default SalesControl;
