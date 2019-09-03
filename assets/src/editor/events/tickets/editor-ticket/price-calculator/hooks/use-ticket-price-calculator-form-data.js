/**
 * External imports
 */
import { useState } from '@wordpress/element';

/**
 * Internal imports
 */
import useTicketPriceCalculatorFormSchema
	from './use-ticket-price-calculator-form-schema';

/**
 * a hook for managing form data
 *
 * @param {BaseEntity} ticket model object
 * @param {BaseEntity[]} prices array of prices
 * @return {Function}  decorator callback for react-final-form
 */
const useTicketPriceCalculatorFormData = ( ticket, prices ) => {
	const formData = useTicketPriceCalculatorFormSchema( ticket, prices );
	const [ currentFormData, setFormData ] = useState( formData );
	return {
		formData: {
			...formData,
			...currentFormData,
			priceIDs: formData.priceIDs,
			priceTypes: formData.priceTypes,
		},
		setFormData,
	};
};

export default useTicketPriceCalculatorFormData;
