import { __ } from '@wordpress/i18n';
import * as yup from 'yup';

import { yupToFinalFormErrors } from '@application/ui/forms/espressoForm';
import { TicketFormShape } from './types';
import { dateAndTimeSchema } from '../../../../shared/services/utils/dateAndTime';

export const validate = async (values: TicketFormShape) => {
	return await yupToFinalFormErrors(validationSchema, values);
};

const validPriceMsg = () => __('Please enter a valid amount');

const validationSchema = yup.object({
	name: yup
		.string()
		.required(() => __('Name is required'))
		.min(3, () => __('Name must be at least three characters')),
	dateTime: dateAndTimeSchema,
	price: yup
		.number()
		.typeError(validPriceMsg)
		.min(0, validPriceMsg),
});
