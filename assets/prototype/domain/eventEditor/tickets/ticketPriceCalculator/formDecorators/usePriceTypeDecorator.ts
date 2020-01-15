import { Calculation } from 'final-form-calculate';

import { TpcActionType, TpcFormData, UpdatedTpcFormDataPath } from '../types';
import { isEqual, getFromFormData, updatePriceModifier, updatePriceInFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';
import { Price, PriceType } from '../../../data/types';
import usePriceTypes from '../../../data/queries/priceTypes/usePriceTypes';
import { getPriceType } from '../../../../shared/predicates/prices/selectionPredicates';
import { getDefaultPriceModifierType } from '../../../../shared/predicates/priceTypes/selectionPredicates';
import toBoolean from '../../../../../application/utilities/converters/toBoolean';

const usePriceTypeDecorator = (): Calculation => {
	const priceTypes = usePriceTypes();
	const getPriceTypeForPrice = getPriceType(priceTypes);
	const defaultPriceType = getDefaultPriceModifierType(priceTypes);
	const calculator = useTicketPriceCalculator();
	return {
		field: /^prices\[\d+\]\.priceType$/,
		isEqual: isEqual,
		updates: (value, name, formData: TpcFormData): UpdatedTpcFormDataPath => {
			const pricePath: string = name.replace('.priceType', '');
			const price = getFromFormData<Price>(pricePath, formData);
			const reverseCalc = toBoolean(getFromFormData<boolean>('ticket.reverseCalculate', formData));
			const priceType: PriceType = getPriceTypeForPrice(price) || defaultPriceType;
			const updatedPrice = updatePriceModifier(price, priceType);
			const updatedPrices = updatePriceInFormData(updatedPrice, formData.prices);
			const formDataWithUpdatedPrice: TpcFormData = { ticket: formData.ticket, prices: updatedPrices };
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
			return { ...formDataCalculations, [pricePath]: updatedPrice };
		},
	};
};

export default usePriceTypeDecorator;
