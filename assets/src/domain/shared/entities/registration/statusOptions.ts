import { __ } from '@wordpress/i18n';

const options = [
	{
		value: 'RAP',
		label: __('Approved', 'event_espresso'),
	},
	{
		value: 'RCN',
		label: __('Cancelled', 'event_espresso'),
	},
	{
		value: 'RDC',
		label: __('Declined', 'event_espresso'),
	},
	{
		value: 'RIC',
		label: __('Incomplete', 'event_espresso'),
	},
	{
		value: 'RNA',
		label: __('Not Approved', 'event_espresso'),
	},
	{
		value: 'RPP',
		label: __('Pending Payment', 'event_espresso'),
	},
	{
		value: 'RWL',
		label: __('Wait List', 'event_espresso'),
	},
];

export default options;
