import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ProfileOutlined, CalendarOutlined, ControlOutlined } from '@ant-design/icons';
import { pick } from 'ramda';

import { CONVERT_TO_MOMENT_DATE_FORMAT, CONVERT_TO_MOMENT_TIME_FORMAT } from '@appConstants/dateFnsFormats';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';
import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';
import { Ticket } from '@edtrServices/apollo/types';
import { EntityId } from '@appServices/apollo/types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@sharedConstants/defaultDates';
import { processDateAndTime, prepareDateForForm } from '@sharedServices/utils/dateAndTime';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { validate } from './formValidation';
import { TicketFormShape } from './types';
import { useTimeZoneTime } from '@appServices/hooks';

type TicketFormConfig = EspressoFormProps<TicketFormShape>;

const FIELD_NAMES: Array<keyof Ticket> = [
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

	const { formatForSite: format, siteTimeToUtc } = useTimeZoneTime();

	const startDate = prepareDateForForm(start, PLUS_ONE_MONTH);
	const endDate = prepareDateForForm(end, PLUS_TWO_MONTHS);

	const { onSubmit } = config;

	const onSubmitFrom: TicketFormConfig['onSubmit'] = ({ dateTime, ...rest }, form, ...restParams) => {
		// convert "dateTime" object to proper UTC "startDate" and "endDate"
		const { startDate, endDate } = processDateAndTime(dateTime, siteTimeToUtc);

		const values = { ...rest, startDate, endDate };

		return onSubmit(values, form, ...restParams);
	};

	const adjacentFormItemProps = {
		className: 'form-item-pair',
		labelCol: { span: 10 },
		wrapperCol: { span: 12 },
		labelAlign: 'right' as 'right',
	};

	const initialValues: TicketFormShape = {
		...pick<Omit<Partial<Ticket>, 'prices'>, keyof Ticket>(FIELD_NAMES, restProps),
		dateTime: {
			startDate: format(startDate, CONVERT_TO_MOMENT_DATE_FORMAT),
			startTime: format(startDate, CONVERT_TO_MOMENT_TIME_FORMAT),
			endDate: format(endDate, CONVERT_TO_MOMENT_DATE_FORMAT),
			endTime: format(endDate, CONVERT_TO_MOMENT_TIME_FORMAT),
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
					{
						name: 'price',
						label: __('Price'),
						info: sprintf(
							__(
								'The total amount of money charged for this ticket. Leave blank to make this ticket selection free.%sClick the button after the input to use the Ticket Price Calculator'
							),
							' \n'
						),
						fieldType: 'text',
						addonAfter: id ? (
							<TicketPriceCalculatorButton ticketId={id} style={{ margin: 0, height: 'auto' }} />
						) : null,
						formItemProps: adjacentFormItemProps,
					},
					{
						name: 'isTaxable',
						label: __('Taxable'),
						fieldType: 'switch',
						info: __(
							'If enabled, all configured taxes will be applied to the price of this ticket upon purchase.'
						),
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
						parseAsInfinity: true,
						formItemProps: adjacentFormItemProps,
						min: -1,
						info: sprintf(
							__(
								'The maximum number of this ticket available for sale.%sSet to 0 stop sales or leave blank for no limit.'
							),
							'\n'
						),
					},
					{
						name: 'uses',
						label: __('Number of Uses'),
						fieldType: 'number',
						parseAsInfinity: true,
						formItemProps: adjacentFormItemProps,
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
						formItemProps: adjacentFormItemProps,
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
						formItemProps: adjacentFormItemProps,
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
						formItemProps: adjacentFormItemProps,
						info: __('If enabled, the ticket will appear first in frontend ticket lists.'),
					},
					{
						name: 'isDefault',
						label: __('Default Ticket'),
						fieldType: 'switch',
						formItemProps: adjacentFormItemProps,
						info: __('If enabled, the ticket will appear on all new events.'),
					},
					{
						name: 'isTrashed',
						label: __('Trash'),
						fieldType: 'switch',
						formItemProps: adjacentFormItemProps,
					},
				],
			},
		],
	};
};

export default useTicketFormConfig;
