import React from 'react';
import { __ } from '@wordpress/i18n';
import { format, parseISO } from 'date-fns';
import { ProfileOutlined, CalendarOutlined, ControlOutlined } from '@ant-design/icons';

import { defaultDateFormat, defaultTimeFormat } from '@appConstants/momentFormats';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';
import useTicketItem from '../../../services/apollo/queries/tickets/useTicketItem';
import { EntityId } from '@edtrServices/apollo/types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/constants/defaultDates';
import { processDateAndTime, DateAndTime } from '../../../../shared/services/utils/processDateAndTime';
import { TicketBaseInput } from '@edtrServices/apollo/mutations';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';

interface TicketFormShape extends TicketBaseInput, DateAndTime {
	dateTime?: DateAndTime;
}

type TicketFormConfig = EspressoFormProps<TicketFormShape>;

const useTicketFormConfig = (id: EntityId, config?: EspressoFormProps): TicketFormConfig => {
	const { name, description, quantity, startDate: start, endDate: end } = useTicketItem({ id }) || {};

	const startDate = start ? parseISO(start) : PLUS_ONE_MONTH;
	const endDate = end ? parseISO(end) : PLUS_TWO_MONTHS;

	const { onSubmit } = config;

	const onSubmitFrom: TicketFormConfig['onSubmit'] = ({ dateTime, ...rest }, form, ...restParams) => {
		// convert "dateTime" object to proper "startDate" and "endDate"
		const { startDate, endDate } = processDateAndTime(dateTime);

		const values = { ...rest, startDate, endDate };

		return onSubmit(values, form, ...restParams);
	};

	const adjacentFormItemProps = {
		labelCol: { span: 10 },
		wrapperCol: { span: 14 },
		labelAlign: 'left' as 'left',
		style: {
			width: '49%',
			display: 'inline-flex',
		},
	};

	return {
		...config,
		onSubmit: onSubmitFrom,
		initialValues: { name, description, quantity },
		layout: 'horizontal',
		debugFields: ['values'],
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
					},
					{
						name: 'description',
						label: __('Description'),
						fieldType: 'textarea',
					},
					{
						name: 'price',
						label: __('Price'),
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
					},
				],
			},
			{
				name: 'dateTime',
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
								initialValue: format(startDate, defaultDateFormat),
							},
							{
								name: 'startTime',
								label: __('Start Time'),
								fieldType: 'timepicker',
								initialValue: format(startDate, defaultTimeFormat),
							},
							{
								name: 'endDate',
								label: __('End Date'),
								fieldType: 'datepicker',
								initialValue: format(endDate, defaultDateFormat),
							},
							{
								name: 'endTime',
								label: __('End Time'),
								fieldType: 'timepicker',
								initialValue: format(endDate, defaultTimeFormat),
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
						formItemProps: adjacentFormItemProps,
					},
					{
						name: 'uses',
						label: __('Number of Uses'),
						fieldType: 'number',
						formItemProps: adjacentFormItemProps,
					},
					{
						name: 'min',
						label: __('Minimum Quantity'),
						fieldType: 'number',
						formItemProps: adjacentFormItemProps,
					},
					{
						name: 'max',
						label: __('Maximum Quantity'),
						fieldType: 'number',
						formItemProps: adjacentFormItemProps,
					},
					{
						name: 'isRequired',
						label: __('Required Ticket'),
						fieldType: 'switch',
						formItemProps: adjacentFormItemProps,
					},
					{
						name: 'isDefault',
						label: __('Default Ticket'),
						fieldType: 'switch',
						formItemProps: adjacentFormItemProps,
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
