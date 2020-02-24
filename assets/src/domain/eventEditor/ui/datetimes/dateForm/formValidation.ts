import { __, sprintf } from '@wordpress/i18n';
import * as yup from 'yup';

import { yupToFinalFormErrors } from '@application/ui/forms/espressoForm';
import { DateFormShape } from './types';
import { dateAndTimeSchema } from '../../../../shared/services/utils/dateAndTime';

export const validate = async (values: DateFormShape) => {
	return await yupToFinalFormErrors(validationSchema, values);
};

const validationSchema = yup.object({
	name: yup
		.string()
		.required(() => sprintf(__('%s is required'), __('Name')))
		.min(3, () => sprintf(__('%s must be at least three characters'), __('Name'))),
	dateTime: dateAndTimeSchema,
});
