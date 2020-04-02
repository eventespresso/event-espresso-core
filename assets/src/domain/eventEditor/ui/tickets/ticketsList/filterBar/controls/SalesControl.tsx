import React from 'react';
import { __ } from '@wordpress/i18n';

import { SelectInput } from '@appInputs/SelectInput';
import { TicketsSales } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';

interface StatusControlProps {
	isChained?: boolean;
	sales: TicketsSales;
	setSales: (sales: TicketsSales) => void;
}

const SalesControl: React.FC<StatusControlProps> = React.memo(({ isChained, sales, setSales }) => {
	return (
		<SelectInput
			label={__('sales')}
			value={sales}
			options={[
				{
					value: TicketsSales.all,
					label: isChained ? __('all tickets for above dates') : __('all tickets for all dates'),
				},
				{
					value: TicketsSales.above90Sold,
					label: __('tickets with 90% or more sold'),
				},
				{
					value: TicketsSales.above75Sold,
					label: __('tickets with 75% or more sold'),
				},
				{
					value: TicketsSales.above50Sold,
					label: __('tickets with 50% or more sold'),
				},
				{
					value: TicketsSales.below50Sold,
					label: __('tickets with less than 50% sold'),
				},
			]}
			onChange={setSales}
		/>
	);
});

export default React.memo(SalesControl, getPropsAreEqual(['isChained'], ['sales']));
