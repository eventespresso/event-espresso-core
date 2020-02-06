// @ts-nocheck
import { Calculation } from 'final-form-calculate';

import { TpcActionType, TpcFormData, TpcPriceModifier, UpdatedTpcFormDataPath } from '../types';
import { isEqual, getFromFormData, getPriceType, updatePriceModifier, updatePriceInFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';
import usePriceTypes from '../../../../services/apollo/queries/priceTypes/usePriceTypes';
import { getDefaultPriceModifierType } from '../../../../../shared/entities/priceTypes/predicates/index';
import { toBoolean } from '../../../../../../application/services/utilities/converters';

const usePriceTypeDecorator = (): Calculation => {
	const priceTypes = usePriceTypes();
	const getPriceTypeForPrice = getPriceType(priceTypes);
	const defaultPriceType = getDefaultPriceModifierType(priceTypes);
	const calculator = useTicketPriceCalculator();
	return {
		field: /^prices\[\d+\]\.priceType$/,
		isEqual: isEqual,
		updates: (value, name, formData: TpcFormData): UpdatedTpcFormDataPath => {
			// get the form data path for the price modifier
			const pricePath: string = name.replace('.priceType', '');
			// get ALL of the price modifier data from the form data
			const priceModifier = getFromFormData<TpcPriceModifier>(pricePath, formData);
			// whether we are calculating the base price or ticket total
			const reverseCalc = toBoolean(getFromFormData<boolean>('ticket.reverseCalculate', formData));
			// we need to know some details about the price type so get that object using the GUID set in the form
			const priceType = getPriceTypeForPrice(priceModifier) || defaultPriceType;
			// update price modifier data with props from newly selected price type
			const updatedPriceModifier = updatePriceModifier(priceModifier, priceType);
			// insert updated price modifier back into the form data prices array
			const updatedPrices = updatePriceInFormData(updatedPriceModifier, formData.prices);
			// insert updated prices array back into the form data
			const formDataWithUpdatedPrice: TpcFormData = {
				ticket: formData.ticket,
				prices: updatedPrices,
			};
			// now pass the newly updated form data to the appropriate calculator
			const formDataCalculations = reverseCalc
				? calculator({
						data: formDataWithUpdatedPrice,
						path: 'prices[0].amount',
						type: TpcActionType.CalculateBasePrice,
				  })
				: calculator({
						data: formDataWithUpdatedPrice,
						path: 'ticket.price',
						type: TpcActionType.CalculateTicketTotal,
				  });
			return {
				...formDataCalculations,
				[pricePath]: priceModifier,
			};
		},
	};
};

export default usePriceTypeDecorator;
