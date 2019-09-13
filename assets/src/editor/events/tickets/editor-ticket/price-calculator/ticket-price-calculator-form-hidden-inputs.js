/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';

const { FormInput } = twoColumnAdminFormLayout;

/**
 * @function
 * @param {Object} values form data
 * @return {Object} hidden inputs
 */
const TicketPriceCalculatorFormHiddenInputs = ( { values } ) => useMemo( () => {
	return (
		<>
			<FormInput
				type="hidden"
				key="ticketID"
				name="ticketID"
				htmlId="ee-ticketID"
				value={ values.ticketID }
			/>
			<FormInput
				type="hidden"
				key="priceIDs"
				name="priceIDs"
				htmlId="ee-priceIDs"
				value={ values.priceIDs }
			/>
			<FormInput
				type="hidden"
				key="priceTypes"
				name="priceTypes"
				htmlId="ee-priceTypes"
				value={ values.priceTypes }
			/>
		</>
	);
}, [ values.ticketID, values.priceIDs, values.priceTypes ] );

export default TicketPriceCalculatorFormHiddenInputs;
