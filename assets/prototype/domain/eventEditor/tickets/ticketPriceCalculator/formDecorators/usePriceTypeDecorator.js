import { map, propEq, when } from 'ramda';
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
				when(propEq('id', updatedPrice.id), () => updatedPrice),
				formData.prices
			);
			const formDataWithUpdatedPrice = { ticket: formData.ticket, prices: updatedPrices };
			const reverseCalc = getFromFormData('ticket.reverseCalculate', formDataWithUpdatedPrice);
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
