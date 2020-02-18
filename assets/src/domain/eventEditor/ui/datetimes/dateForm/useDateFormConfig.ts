import { __ } from '@wordpress/i18n';
import { format, parseISO } from 'date-fns';

import { EspressoFormProps, dateFormat, timeFormat } from '@application/ui/forms/espressoForm';
import useDatetimeItem from '../../../services/apollo/queries/datetimes/useDatetimeItem';
import { EntityId } from '@edtrServices/apollo/types';

const useDateFormConfig = (id: EntityId, config?: EspressoFormProps): EspressoFormProps => {
	const { name, description, capacity, startDate, endDate } = useDatetimeItem({ id }) || {};
	return {
		onSubmit: (values) => console.log(values),
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
				name: 'date_time',
				title: __('Date & Time'),
				fields: [
					{
						name: 'date_time',
						label: '',
						fieldType: 'group',
						subFields: [
							{
								name: 'start_date',
								label: __('Start Date'),
								fieldType: 'datepicker',
								initialValue: format(new Date(), dateFormat),
							},
							{
								name: 'start_time',
								label: __('Start Time'),
								fieldType: 'timepicker',
								initialValue: format(new Date(), timeFormat),
							},
							{
								name: 'end_date',
								label: __('End Date'),
								fieldType: 'datepicker',
								initialValue: format(new Date(), dateFormat),
							},
							{
								name: 'end_time',
								label: __('End Time'),
								fieldType: 'timepicker',
								initialValue: format(new Date(), timeFormat),
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
						formItemProps: {
							labelCol: { span: 4 },
							wrapperCol: { span: 14 },
							labelAlign: 'left',
						},
					},
				],
			},
		],
		...config,
	};
};

export default useDateFormConfig;
