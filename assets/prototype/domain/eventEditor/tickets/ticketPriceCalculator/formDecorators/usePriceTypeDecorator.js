import { allPass, map, propEq, when } from 'ramda';
import { isEqual, getFromFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';
import usePriceTypes from '../../../data/queries/priceTypes/usePriceTypes';
import { getPriceType } from '../../../../shared/predicates/prices/selectionPredicates';
import { getDefaultPriceType } from '../../../../shared/predicates/priceTypes/selectionPredicates';

const usePriceTypeDecorator = () => {
	const priceTypes = usePriceTypes();
	const getPriceTypeForPrice = getPriceType(priceTypes);
	const defaultPriceType = getDefaultPriceType(priceTypes);
	const calculator = useTicketPriceCalculator();
	return {
		field: /^prices\[\d+\]\.priceType$/,
		isEqual: isEqual,
		updates: (value, name, formData) => {
			const pricePath = name.replace('.priceType', '');
			const price = getFromFormData(pricePath, formData);
			const reverseCalc = getFromFormData('ticket.reverseCalculate', formData);
			let priceType = getPriceTypeForPrice(price);
			priceType = priceType || defaultPriceType;
			const updatedPrice = {
				...price,
				isBasePrice: priceType.isBasePrice,
				isDiscount: priceType.isDiscount,
				isPercent: priceType.isPercent,
				isTax: priceType.isTax,
				order: priceType.order,
				priceType: priceType.id,
			};
			const updatedPrices = map(
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
						propEq('amount', updatedPrice.amount),
						propEq('priceType', updatedPrice.priceType),
					]),
					() => updatedPrice
				),
				formData.prices
			);
			const formDataWithUpdatedPrice = { ticket: formData.ticket, prices: updatedPrices };
			const formDataCalculations = reverseCalc
				? calculator({
						data: formDataWithUpdatedPrice,
						path: 'prices[0].amount',
						type: 'CALCULATE_BASE_PRICE',
				  })
				: calculator({
						data: formDataWithUpdatedPrice,
						path: 'ticket.price',
						type: 'CALCULATE_TICKET_TOTAL',
				  });
			return { ...formDataCalculations, [pricePath]: updatedPrice };
		},
	};
};

export default usePriceTypeDecorator;
