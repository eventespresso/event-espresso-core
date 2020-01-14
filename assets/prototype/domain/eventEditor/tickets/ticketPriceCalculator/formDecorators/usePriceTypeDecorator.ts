import { Calculation } from 'final-form-calculate';
import { allPass, map, propEq, when } from 'ramda';

import { TpcActionType, TpcFormData, UpdatedTpcFormDataPath } from '../types';
import { isEqual, getFromFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';
import { Price, PriceType } from '../../../data/types';
import usePriceTypes from '../../../data/queries/priceTypes/usePriceTypes';
import { getPriceType } from '../../../../shared/predicates/prices/selectionPredicates';
import { getDefaultPriceType } from '../../../../shared/predicates/priceTypes/selectionPredicates';

const usePriceTypeDecorator = (): Calculation => {
	const priceTypes = usePriceTypes();
	const getPriceTypeForPrice = getPriceType(priceTypes);
	const defaultPriceType = getDefaultPriceType(priceTypes);
	const calculator = useTicketPriceCalculator();
	return {
		field: /^prices\[\d+\]\.priceType$/,
		isEqual: isEqual,
		updates: (value, name, formData: TpcFormData): UpdatedTpcFormDataPath => {
			const pricePath: string = name.replace('.priceType', '');
			const price: Price = getFromFormData(pricePath, formData);
			const reverseCalc = Boolean(getFromFormData('ticket.reverseCalculate', formData));
			let priceType: PriceType = getPriceTypeForPrice(price);
			priceType = priceType || defaultPriceType;
			const updatedPrice: Price = {
				...price,
				isBasePrice: priceType.isBasePrice,
				isDiscount: priceType.isDiscount,
				isPercent: priceType.isPercent,
				isTax: priceType.isTax,
				priceType: priceType.id,
			};
			const updatedPrices: Price[] = map(
				when(
					// Need to replace the existing price in the form data based on several criteria,
					// since id will be blank for any newly added price modifiers, and several prices
					// may all be using the same base price type (like $ surcharge).
					// May have to implement some kind of unique random key for each row
					// because it is entirely possible that a user could add multiple price modifiers
					// with the exact same details (would be silly but that doesn't mean it's not possible)
					// which would make the following checks fail, resulting in the wrong row being updated
					allPass([
						propEq('id', updatedPrice.id),
						propEq('name', updatedPrice.name),
						propEq('desc', updatedPrice.desc),
						propEq('amount', updatedPrice.amount),
						propEq('priceType', updatedPrice.priceType),
					]),
					() => updatedPrice
				),
				formData.prices
			);
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
