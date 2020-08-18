import React, { useMemo, useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { pick } from 'ramda';
import { parseISO } from 'date-fns';

import { CalendarOutlined, ControlOutlined, ProfileOutlined } from '@appDisplay/icons/svgs';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';
import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';
import { Ticket } from '@edtrServices/apollo/types';
import { EntityId } from '@dataServices/types';
import { processDateAndTime } from '@sharedServices/utils/dateAndTime';
import { useTimeZoneTime, useMemoStringify } from '@appServices/hooks';
import { PLUS_ONE_MONTH } from '@sharedConstants/defaultDates';
import { setDateToToday, setTimeToZeroHour, setDefaultTime } from '@appServices/utilities/date';
import { validate } from './formValidation';
import { TicketFormShape } from './types';

type TicketFormConfig = EspressoFormProps<TicketFormShape>;

const FIELD_NAMES: Array<keyof Ticket> = [
	'id',
	'description',
	'isDefault',
	'isRequired',
	'isTaxable',
	'isTrashed',
	'max',
	'min',
	'name',
	'price',
	'quantity',
	'uses',
];

const useTicketFormConfig = (id: EntityId, config?: EspressoFormProps): TicketFormConfig => {
	const ticket = useTicketItem({ id });

	const { siteTimeToUtc, utcToSiteTime } = useTimeZoneTime();

	const startDate = useMemoStringify(
		ticket?.startDate ? utcToSiteTime(parseISO(ticket?.startDate)) : setDefaultTime(PLUS_ONE_MONTH, 'start')
	);
	const endDate = useMemoStringify(
		ticket?.endDate ? utcToSiteTime(parseISO(ticket?.endDate)) : setDefaultTime(PLUS_ONE_MONTH, 'end')
	);

	const { onSubmit } = config;

	const onSubmitFrom: TicketFormConfig['onSubmit'] = useCallback(
		({ dateTime, ...rest }, form, ...restParams) => {
			// convert "dateTime" object to proper UTC "startDate" and "endDate"
			const { startDate, endDate } = processDateAndTime(dateTime, siteTimeToUtc);

			const values = { ...rest, startDate, endDate };

			return onSubmit(values, form, ...restParams);
		},
		[onSubmit, siteTimeToUtc]
	);

	const adjacentFormItemProps = useMemoStringify({
		className: 'ee-form-item-pair',
	});

	const initialValues: TicketFormShape = useMemo(
		() => ({
			...pick<Omit<Partial<Ticket>, 'prices'>, keyof Ticket>(FIELD_NAMES, ticket || {}),
			dateTime: {
				/**
				 * for validations, we need to make
				 * - time same for dates
				 * - date same for times
				 * ¯\_(ツ)_/¯
				 */
				startDate: setTimeToZeroHour(startDate),
				startTime: setDateToToday(startDate),
				endDate: setTimeToZeroHour(endDate),
				endTime: setDateToToday(endDate),
			},
		}),
		[endDate, startDate, ticket]
	);

	return useMemo(
		() => ({
			...config,
			onSubmit: onSubmitFrom,
			initialValues,
			validate,
			layout: 'horizontal',
			debugFields: ['values', 'errors'],
			sections: [
				{
					name: 'basics',
					icon: ProfileOutlined,
					title: __('Basics'),
					fields: [
						{
							name: 'name',
							label: __('Name'),
							fieldType: 'text',
							min: 3,
							required: true,
						},
						{
							name: 'description',
							label: __('Description'),
							fieldType: 'textarea',
						},
					],
				},
				{
					name: 'sales',
					icon: CalendarOutlined,
					title: __('Ticket Sales'),
					fields: [
						{
							name: 'dateTime',
							label: '',
							fieldType: 'group',
							subFields: [
								{
									name: 'startDate',
									label: __('Start Date'),
									fieldType: 'datepicker',
									required: true,
								},
								{
									name: 'startTime',
									label: __('Start Time'),
									fieldType: 'timepicker',
									required: true,
								},
								{
									name: 'endDate',
									label: __('End Date'),
									fieldType: 'datepicker',
									required: true,
								},
								{
									name: 'endTime',
									label: __('End Time'),
									fieldType: 'timepicker',
									required: true,
								},
							],
						},
					],
				},
				{
					name: 'details',
					icon: ControlOutlined,
					title: __('Details'),
					fields: [
						{
							name: 'quantity',
							label: __('Quantity For Sale'),
							fieldType: 'number',
							formControlProps: adjacentFormItemProps,
							parseAsInfinity: true,
							min: -1,
							info: sprintf(
								__(
									'The maximum number of this ticket available for sale.%sSet to 0 to stop sales, or leave blank for no limit.'
								),
								'\n'
							),
						},
						{
							name: 'uses',
							label: __('Number of Uses'),
							fieldType: 'number',
							parseAsInfinity: true,
							formControlProps: adjacentFormItemProps,
							min: 0,
							info: sprintf(
								__(
									'Controls the total number of times this ticket can be used, regardless of the number of dates it is assigned to.%sExample: A ticket might have access to 4 different dates, but setting this field to 2 would mean that the ticket could only be used twice. Leave blank for no limit.'
								),
								'\n'
							),
						},
						{
							name: 'min',
							label: __('Minimum Quantity'),
							fieldType: 'number',
							formControlProps: adjacentFormItemProps,
							min: 0,
							info: sprintf(
								__(
									'The minimum quantity that can be selected for this ticket. Use this to create ticket bundles or graduated pricing.%sLeave blank for no minimum.'
								),
								'\n'
							),
						},
						{
							name: 'max',
							label: __('Maximum Quantity'),
							fieldType: 'number',
							parseAsInfinity: true,
							formControlProps: adjacentFormItemProps,
							min: -1,
							info: sprintf(
								__(
									'The maximum quantity that can be selected for this ticket. Use this to create ticket bundles or graduated pricing.%sLeave blank for no maximum.'
								),
								'\n'
							),
						},
						{
							name: 'isRequired',
							label: __('Required Ticket'),
							fieldType: 'switch',
							formControlProps: adjacentFormItemProps,
							info: __('If enabled, the ticket will appear first in frontend ticket lists.'),
						},
						{
							name: 'isDefault',
							label: __('Default Ticket'),
							fieldType: 'switch',
							formControlProps: adjacentFormItemProps,
							info: __('If enabled, the ticket will appear on all new events.'),
						},
						{
							name: 'isTrashed',
							label: __('Trash'),
							fieldType: 'switch',
							formControlProps: adjacentFormItemProps,
						},
					],
				},
			],
		}),
		[adjacentFormItemProps, config, initialValues, onSubmitFrom]
	);
};

export default useTicketFormConfig;
