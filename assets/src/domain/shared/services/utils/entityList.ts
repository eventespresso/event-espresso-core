import { ApolloError } from 'apollo-client';
import { __ } from '@wordpress/i18n';

import { OptionsType } from '@infraUI/inputs';
import { Event, Datetime, Ticket } from '@edtrServices/apollo';

export const buildEntitySelectOptions = <E extends Event | Datetime | Ticket>(
	list: Array<E>,
	loading: boolean,
	error: ApolloError
): OptionsType => {
	if (loading) {
		return [
			{
				label: __('Loading...', 'event_espresso'),
				value: '',
			},
		];
	}
	if (error) {
		return [
			{
				label: __('Error', 'event_espresso'),
				value: '',
			},
		];
	}
	return [
		{
			label: __('Select...', 'event_espresso'),
			value: '',
		},
		...list.map(({ id: value, name: label }) => ({ label, value })),
	];
};
