/**
 * External imports
 */
import createDecorator from 'final-form-calculate';
import { find, map, path, propEq, when } from 'ramda';
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import useTicketPriceCalculator from './useTicketPriceCalculator';
import usePriceTypes from '../../../containers/queries/usePriceTypes';

// import {amountsMatch} from '@eventespresso/utils';
const amountsMatch = (v1, v2) => parseFloat(v1) === parseFloat(v2);

const isEqual = (value, prev) => prev === null || prev === undefined || value === prev;
const boolsEqual = (value, prev) => prev === null || prev === undefined || !!value === !!prev;
const amountsEqual = (value, prev) => prev === null || prev === undefined || amountsMatch(prev, value);

const pathName = (name) =>
	name
		.replace('[', '.')
		.replace(']', '')
		.split('.');
const getValue = (name, prevData) => {
	const namePath = pathName(name);
	return path(namePath, prevData);
};
const getBasePriceType = (price, priceTypes) => find(propEq('id', price.priceType))(priceTypes);

/**
 * a form decorator used for capturing form data
 * so that the ticket price calculator can process changes
 *
 * @return {Function}  decorator callback for react-final-form
 */
const useTicketPriceCalculatorFormDecorator = () => {
	const priceTypes = usePriceTypes();
	const calculator = useTicketPriceCalculator();
	const updateBasePrice = useCallback(
		(formData) => {
			const result = calculator(formData, { type: 'CALCULATE_BASE_PRICE' });
			const newBasePrice = getValue('prices[0].amount', result);
			return { ['prices[0].amount']: newBasePrice };
		},
		[calculator]
	);
	const updateTicketTotal = useCallback(
		(formData) => {
			const result = calculator(formData, { type: 'CALCULATE_TICKET_TOTAL/' });
			const newTicketTotal = getValue('ticket.price', result);
			return { ['ticket.price']: newTicketTotal };
		},
		[calculator]
	);
	return createDecorator(
		{
			field: /^prices\[\d+\]\.amount$/,
			isEqual: amountsEqual,
			updates: (value, name, formData) => {
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
			updates: (value, name, formData) => {
				const pricePath = name.replace('.priceType', '');
				const price = getValue(pricePath, formData);
				console.log('>>>> createDecorator', { price, priceTypes });
				const priceType = getBasePriceType(price, priceTypes);
				const updatedPrice = {
					...price,
					isDiscount: priceType.isDiscount,
					isPercent: priceType.isPercent,
					order: priceType.order,
					priceType: priceType.id,
				};
				const updatedPrices = map(
					when(propEq('id', updatedPrice.id), () => updatedPrice),
					formData.prices
				);
				const formDataWithUpdatedPrice = { ticket: formData.ticket, prices: updatedPrices };
				const reverseCalc = getValue('ticket.reverseCalculate', formDataWithUpdatedPrice);
				const formDataCalculations = reverseCalc
					? updateBasePrice(formDataWithUpdatedPrice)
					: updateTicketTotal(formDataWithUpdatedPrice);
				return {
					...formDataCalculations,
					[pricePath]: updatedPrice,
				};
			},
		},
		{
			field: 'ticket.reverseCalculate',
			isEqual: boolsEqual,
			updates: (value, name, formData) => {
				const reverseCalc = getValue('ticket.reverseCalculate', formData);
				return reverseCalc ? updateBasePrice(formData) : updateTicketTotal(formData);
			},
		},
		{
			field: 'ticket.price',
			isEqual: amountsEqual,
			updates: (value, name, formData) => {
				const reverseCalc = getValue('ticket.reverseCalculate', formData);
				// we don't want to update the base price if reverse calculate is false
				if (reverseCalc) {
					return updateBasePrice(formData);
				}
				return {};
			},
		}
	);
};

export default useTicketPriceCalculatorFormDecorator;
