import { __ } from '@wordpress/i18n';

const options = [
	{
		value: 'APPROVED',
		label: __('Approved', 'event_espresso'),
	},
	{
		value: 'CANCELLED',
		label: __('Cancelled', 'event_espresso'),
	},
	{
		value: 'DECLINED',
		label: __('Declined', 'event_espresso'),
	},
	{
		value: 'INCOMPLETE',
		label: __('Incomplete', 'event_espresso'),
	},
	{
		value: 'UNAPPROVED',
		label: __('Not Approved', 'event_espresso'),
	},
	{
		value: 'PENDING_PAYMENT',
		label: __('Pending Payment', 'event_espresso'),
	},
	{
		value: 'WAIT_LIST',
		label: __('Wait List', 'event_espresso'),
	},
];

export default options;
