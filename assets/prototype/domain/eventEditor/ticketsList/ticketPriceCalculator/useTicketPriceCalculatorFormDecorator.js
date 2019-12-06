/**
 * External imports
 */
import createDecorator from 'final-form-calculate';
import { find, map, path, propEq, when } from 'ramda';
import {useCallback} from '@wordpress/element';

/**
 * Internal imports
 */
import useTicketPriceCalculator from './reducers/useTicketPriceCalculator';

// import {amountsMatch} from '@eventespresso/utils';
const amountsMatch = (v1, v2) => parseFloat(v1) === parseFloat(v2);

const isEqual = (value, prevValue) => prevValue === null || prevValue === undefined || value === prevValue;
const boolsEqual = (value, prevValue) => prevValue === null || prevValue === undefined || !! value === !! prevValue;
const amountsEqual = (value, prevValue) => prevValue === null ||
	prevValue === undefined ||
	amountsMatch(prevValue, value);

const pathName = (name) => name.replace('[', '.').replace(']', '').split('.')
const getValue = (name, prevData) => {
	const namePath = pathName(name);
	return path(namePath, prevData);
}
const basePriceTypes = [
	{ id: 1, type: 'Base Price', isDiscount: false, isPercent: false, order: 0 },
	{ id: 2, type: 'Percent Discount', isDiscount: true, isPercent: true, order: 20 },
	{ id: 3, type: 'Dollar Discount', isDiscount: true, isPercent: false, order: 30 },
	{ id: 4, type: 'Percent Surcharge', isDiscount: false, isPercent: true, order: 40 },
	{ id: 5, type: 'Dollar Surcharge', isDiscount: false, isPercent: false, order: 50 },
	{ id: 6, type: 'Regional Tax', isDiscount: false, isPercent: true, order: 60 },
	{ id: 7, type: 'Federal Tax', isDiscount: false, isPercent: true, order: 70 },
];
const getBasePriceType = (price) => find(propEq('id', parseInt(price.priceType, 10)))(basePriceTypes);

/**
 * a form decorator used for capturing form data
 * so that the ticket price calculator can process changes
 *
 * @return {Function}  decorator callback for react-final-form
 */
const useTicketPriceCalculatorFormDecorator = () => {
	const calculator = useTicketPriceCalculator();
	const updateBasePrice = useCallback((formData) => {
		const result = calculator(formData, { type: 'CALCULATE_BASE_PRICE' })
		const newBasePrice = getValue('prices[0].amount', result);
		return { ['prices[0].amount']: newBasePrice };
	}, [calculator]);
	const updateTicketTotal = useCallback((formData) => {
		const result = calculator(formData, { type: 'CALCULATE_TOTAL' })
		const newTicketTotal = getValue('ticket.price', result);
		return { ['ticket.price']: newTicketTotal };
	}, [calculator]);
	return createDecorator(
		{
			field: /^prices\[\d+\]\.amount$/,
			isEqual: amountsEqual,
			updates: (value, name, formData, prevData) => {
				const prevValue = getValue(name, prevData);
				const reverseCalc = getValue('ticket.reverseCalculate', formData);
				if (reverseCalc) {
					if (name === 'prices[0].amount') {
						return {};
					}
					return updateBasePrice(formData);
				}
				return updateTicketTotal(formData);
			},
		},
		{
			field: /^prices\[\d+\]\.priceType$/,
			isEqual: isEqual,
			updates: (value, name, formData, prevData) => {
				const prevValue = getValue(name, prevData);
				const pricePath = name.replace('.priceType', '');
				const price = getValue(pricePath, formData);
				const priceType = getBasePriceType(price);
				const updatedPrice = {
					...price,
					isDiscount: priceType.isDiscount,
					isPercent: priceType.isPercent,
					order: priceType.order,
					priceType: parseInt(priceType.id, 10),
				};
				const updatedPrices = map(
					when(propEq('id', updatedPrice.id), () => updatedPrice),
					formData.prices
				);
				const formDataWithUpdatedPrice = { ticket: formData.ticket, prices: updatedPrices };
				// basePriceTypes
				const reverseCalc = getValue('ticket.reverseCalculate', formDataWithUpdatedPrice);
				const formDataCalculations = reverseCalc ?
					updateBasePrice(formDataWithUpdatedPrice) :
					updateTicketTotal(formDataWithUpdatedPrice);
				return {
					...formDataCalculations,
					[pricePath]: updatedPrice
				}
			},
		},
		{
			field: 'ticket.reverseCalculate',
			isEqual: boolsEqual,
			updates: (value, name, formData, prevData) => {
				const prevValue = !! getValue(name, prevData);
				const reverseCalc = getValue('ticket.reverseCalculate', formData);
				return reverseCalc ? updateBasePrice(formData) : updateTicketTotal(formData);
			},
		},
		{
			field: 'ticket.price',
			isEqual: amountsEqual,
			updates: (value, name, formData, prevData) => {
				const prevValue = getValue(name, prevData);
				const reverseCalc = getValue('ticket.reverseCalculate', formData);
				// we don't want to update the base price if reverse calculate is false
				if (reverseCalc) {
					return updateBasePrice(formData);
				}
				return {};
			},
		},
	);
};

export default useTicketPriceCalculatorFormDecorator;
