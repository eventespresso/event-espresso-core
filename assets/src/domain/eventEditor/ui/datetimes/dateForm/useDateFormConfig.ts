import { __ } from '@wordpress/i18n';
import { format, parseISO } from 'date-fns';
import { ProfileOutlined, CalendarOutlined, ControlOutlined } from '@ant-design/icons';
import { pick } from 'ramda';

import { defaultDateFormat, defaultTimeFormat } from '@appConstants/momentFormats';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';
import useDatetimeItem from '../../../services/apollo/queries/datetimes/useDatetimeItem';
import { EntityId, Datetime } from '@edtrServices/apollo/types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/constants/defaultDates';
import { processDateAndTime, DateAndTime } from '../../../../shared/services/utils/processDateAndTime';
import { DatetimeBaseInput } from '@edtrServices/apollo/mutations';

interface DateFormShape extends DatetimeBaseInput, DateAndTime {
	name?: string;
	description?: string;
	capacity?: number;
	dateTime?: DateAndTime;
	isTrashed?: boolean;
}

type DateFormConfig = EspressoFormProps<DateFormShape>;

const FIELD_NAMES: Array<keyof Datetime> = ['name', 'description', 'capacity', 'isTrashed'];

const useDateFormConfig = (id: EntityId, config?: EspressoFormProps): DateFormConfig => {
	const { startDate: start, endDate: end, ...restProps } = useDatetimeItem({ id }) || {};

	const startDate = start ? parseISO(start) : PLUS_ONE_MONTH;
	const endDate = end ? parseISO(end) : PLUS_TWO_MONTHS;

	const { onSubmit } = config;

	const onSubmitFrom: DateFormConfig['onSubmit'] = ({ dateTime, ...rest }, form, ...restParams) => {
		// convert "dateTime" object to proper "startDate" and "endDate"
		const { startDate, endDate } = processDateAndTime(dateTime);

		const values = { ...rest, startDate, endDate };

		return onSubmit(values, form, ...restParams);
	};

	const initialValues: DateFormShape = {
		...pick<Partial<Datetime>, keyof Datetime>(FIELD_NAMES, restProps),
		dateTime: {
			startDate: format(startDate, defaultDateFormat),
			startTime: format(startDate, defaultTimeFormat),
			endDate: format(endDate, defaultDateFormat),
			endTime: format(endDate, defaultTimeFormat),
		},
	};

	return {
		...config,
		onSubmit: onSubmitFrom,
		initialValues,
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
				],
			},
			{
				name: 'dateTime',
				icon: CalendarOutlined,
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
