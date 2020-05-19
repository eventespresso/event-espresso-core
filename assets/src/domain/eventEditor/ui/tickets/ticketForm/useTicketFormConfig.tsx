import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { pick } from 'ramda';
import { parseISO } from 'date-fns';

import { CalendarOutlined, ControlOutlined, ProfileOutlined } from '@appDisplay/icons/svgs';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';
import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';
import { Ticket } from '@edtrServices/apollo/types';
import { EntityId } from '@dataServices/types';
import { processDateAndTime } from '@sharedServices/utils/dateAndTime';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { validate } from './formValidation';
import { TicketFormShape } from './types';
import { useTimeZoneTime } from '@appServices/hooks';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@sharedConstants/defaultDates';
import { setDateToToday, setTimeToZeroHour } from '@appServices/utilities/date';

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
	const { startDate: start, endDate: end, ...restProps } = useTicketItem({ id }) || {};

	const { siteTimeToUtc, utcToSiteTime } = useTimeZoneTime();

	const startDate = start ? utcToSiteTime(parseISO(start)) : PLUS_ONE_MONTH;
	const endDate = end ? utcToSiteTime(parseISO(end)) : PLUS_TWO_MONTHS;

	const { onSubmit } = config;

	const onSubmitFrom: TicketFormConfig['onSubmit'] = ({ dateTime, ...rest }, form, ...restParams) => {
		// convert "dateTime" object to proper UTC "startDate" and "endDate"
		const { startDate, endDate } = processDateAndTime(dateTime, siteTimeToUtc);

		const values = { ...rest, startDate, endDate };

		return onSubmit(values, form, ...restParams);
	};

	const adjacentFormItemProps = {
		className: 'ee-form-item-pair',
	};

	const initialValues: TicketFormShape = {
		...pick<Omit<Partial<Ticket>, 'prices'>, keyof Ticket>(FIELD_NAMES, restProps),
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
	};

	return {
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
							},
							{
								name: 'startTime',
								label: __('Start Time'),
								fieldType: 'timepicker',
							},
							{
								name: 'endDate',
								label: __('End Date'),
								fieldType: 'datepicker',
							},
							{
								name: 'endTime',
								label: __('End Time'),
								fieldType: 'timepicker',
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
	};
};

export default useTicketFormConfig;
