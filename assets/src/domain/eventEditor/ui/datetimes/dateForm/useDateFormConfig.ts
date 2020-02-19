import { __ } from '@wordpress/i18n';
import { format, parseISO, parse } from 'date-fns';

import { EspressoFormProps, dateFormat, timeFormat } from '@application/ui/forms/espressoForm';
import useDatetimeItem from '../../../services/apollo/queries/datetimes/useDatetimeItem';
import { EntityId } from '@edtrServices/apollo/types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/constants/defaultDates';

interface DateFormShape {
	name?: string;
	description?: string;
	capacity?: number;
	dateTime?: {
		startDate: string;
		startTime: string;
		endDate: string;
		endTime: string;
	};
	isTrashed?: boolean;
}

type DateFormConfig = EspressoFormProps<DateFormShape>;

const useDateFormConfig = (id: EntityId, config?: EspressoFormProps): DateFormConfig => {
	const { name, description, capacity, startDate: start, endDate: end } = useDatetimeItem({ id }) || {};

	const startDate = start ? parseISO(start) : PLUS_ONE_MONTH;
	const endDate = end ? parseISO(end) : PLUS_TWO_MONTHS;

	const { onSubmit } = config;

	const onSubmitFrom: DateFormConfig['onSubmit'] = ({ dateTime, ...rest }, form, ...restParams) => {
		// convert "dateTime" object to proper "startDate" and "endDate"
		const startDateStr = `${dateTime.startDate} ${dateTime.startTime}`;
		const endDateStr = `${dateTime.endDate} ${dateTime.endTime}`;
		const formatStr = `${dateFormat} ${timeFormat}`;

		const startDate = parse(startDateStr, formatStr, new Date());
		const endDate = parse(endDateStr, formatStr, new Date());

		const values = { ...rest, startDate, endDate };

		return onSubmit(values, form, ...restParams);
	};

	return {
		...config,
		onSubmit: onSubmitFrom,
		initialValues: { name, description, capacity },
		layout: 'horizontal',
		debugFields: ['values'],
		sections: [
			{
				name: 'basics',
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
				],
			},
			{
				name: 'dateTime',
				title: __('Date & Time'),
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
								initialValue: format(startDate, dateFormat),
							},
							{
								name: 'startTime',
								label: __('Start Time'),
								fieldType: 'timepicker',
								initialValue: format(startDate, timeFormat),
							},
							{
								name: 'endDate',
								label: __('End Date'),
								fieldType: 'datepicker',
								initialValue: format(endDate, dateFormat),
							},
							{
								name: 'endTime',
								label: __('End Time'),
								fieldType: 'timepicker',
								initialValue: format(endDate, timeFormat),
							},
						],
					},
				],
			},
			{
				name: 'details',
				title: __('Details'),
				fields: [
					{
						name: 'capacity',
						label: __('Capacity'),
						fieldType: 'number',
					},
					{
						name: 'isTrashed',
						label: __('Trash'),
						fieldType: 'switch',
					},
				],
			},
		],
	};
};

export default useDateFormConfig;
