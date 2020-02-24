import { __, sprintf } from '@wordpress/i18n';
import { format } from 'date-fns';
import { ProfileOutlined, CalendarOutlined, ControlOutlined } from '@ant-design/icons';
import { pick } from 'ramda';

import { CONVERT_TO_MOMENT_DATE_FORMAT, CONVERT_TO_MOMENT_TIME_FORMAT } from '@appConstants/dateFnsFormats';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';
import useDatetimeItem from '../../../services/apollo/queries/datetimes/useDatetimeItem';
import { EntityId, Datetime } from '@edtrServices/apollo/types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/constants/defaultDates';
import { processDateAndTime, prepareDateForForm } from '../../../../shared/services/utils/dateAndTime';
import { validate } from './formValidation';
import { DateFormShape } from './types';

type DateFormConfig = EspressoFormProps<DateFormShape>;

const FIELD_NAMES: Array<keyof Datetime> = ['name', 'description', 'capacity', 'isTrashed'];

const useDateFormConfig = (id: EntityId, config?: EspressoFormProps): DateFormConfig => {
	const { startDate: start, endDate: end, ...restProps } = useDatetimeItem({ id }) || {};

	const startDate = prepareDateForForm(start, PLUS_ONE_MONTH);
	const endDate = prepareDateForForm(end, PLUS_TWO_MONTHS);

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
						required: true,
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
						name: 'capacity',
						label: __('Capacity'),
						fieldType: 'number',
						min: -1,
						desc: sprintf(
							__(
								'The maximum number of registrants that can attend the event at this particular date.%sSet to 0 to close registration or set to -1 for no limit.'
							),
							'\n'
						),
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
