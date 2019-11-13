/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { usePriceTypes } from '@eventespresso/hooks';

/**
 * Internal imports
 */
import {
	useGetPriceModifiersFromFormData,
	useTicketBasePriceCalculator,
	useTicketTotalCalculator,
	useUpdatePriceModifiersFromFormData,
} from './';
import {
	calculateTicketBasePriceFromTotal,
	calculateTicketTotalFromModifiers,
} from '../utils/';

/**
 * callback for calculating ticket base price or total prices
 *
 * @param {BaseEntity[]} prices
 * @param {Function} setFormData
 * @return {Function} calculateTicketPrices callback
 */
const useCalculateTicketPrices = ( prices, setFormData ) => {
	const { priceTypes } = usePriceTypes();
	const calculateTicketBasePrice = useTicketBasePriceCalculator(
		prices,
		priceTypes
	);
	const calculateTicketTotal = useTicketTotalCalculator( prices, priceTypes );
	const getPriceModifiersFromFormData = useGetPriceModifiersFromFormData(
		prices
	);
	const updatePriceModifiers = useUpdatePriceModifiersFromFormData();
	return useCallback(
		/**
		 * recalculates ticket base or total price
		 *
		 * @param {Object} formData
		 */
		( formData ) => {
			if ( ! formData.updated ) {
				return;
			}
			const priceModifiers = getPriceModifiersFromFormData( formData );
			updatePriceModifiers( priceModifiers, formData );
			const formChanges = formData.reverseCalculate ?
				calculateTicketBasePriceFromTotal(
					formData,
					priceModifiers,
					calculateTicketBasePrice
				) :
				calculateTicketTotalFromModifiers(
					formData,
					priceModifiers,
					calculateTicketTotal
				);
			formData = { ...formData, ...formChanges };
			formData.updated = false;
			setFormData( formData );
		},
		[ prices ]
	);
};

export default useCalculateTicketPrices;
