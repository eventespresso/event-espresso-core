/**
 * External imports
 */
import path from 'ramda/src/path';
import createDecorator from 'final-form-calculate';
import {useCallback} from '@wordpress/element';
// import {amountsMatch} from '@eventespresso/utils';

const amountsMatch = (v1, v2) => parseFloat(v1) === parseFloat(v2);

const pathName = (name) => name.replace('[', '.').replace(']', '').split('.')
const getValue = (name, prevData) => {
	const namePath = pathName(name);
	return path(namePath, prevData);
}

/**
 * a form decorator used for capturing form data
 * so that the ticket price calculator can process changes
 *
 * @return {Function}  decorator callback for react-final-form
 */
const useTicketPriceCalculatorFormDecorator = ( calculator ) => useCallback( () => createDecorator(
	{
		field: /^prices\[\d+\]\.amount$/,
		isEqual: (v1, v2) => {
			console.log('%c FormDecorator amount isEqual: ', 'color: LightPurple;', v1, v2);
		},
		updates: (value, name, formData, prevData) => {
			const prevValue = getValue(name, prevData);
			console.log('%c FormDecorator: ', 'color: MediumPurple;', name, value, prevValue);
			if (prevValue !== undefined && ! amountsMatch(prevValue, value) ) {
				console.log('');
				console.log('%c useTicketPriceCalculatorFormDecorator ==> price.amount: ', 'color:Violet; font-size:14px;');
				console.log('%c > name: ', 'color: magenta;', name);
				console.log('%c > value: ', 'color: magenta;', value);
				console.log('%c > prevValue : ', 'color: magenta;', prevValue);
				console.log('%c > formData: ', 'color: magenta;', formData);
				console.log('%c > prevData: ', 'color: magenta;', prevData);
				const reverseCalc = getValue('ticket.reverseCalculate', formData);
				const action = reverseCalc ? { type: 'CALCULATE_BASE_PRICE' } : { type: 'CALCULATE_TOTAL' };
				const result = calculator(formData, action)
				console.log('%c > result: ', 'color: magenta;', result);
				if (reverseCalc) {
					const newBasePrice = getValue('prices[0].amount', result);
					console.log('%c > newBasePrice: ', 'color: magenta; font-size:14px;', newBasePrice);
					return { ['prices[0].amount']: newBasePrice };
				}
				const newTicketTotal = getValue('ticket.price', result);
				console.log('%c > newTicketTotal: ', 'color: magenta; font-size:14px;', newTicketTotal);
				return { ['ticket.price']: newTicketTotal };
			}
			return {};
		},
	},
	{
		field: /^prices\[\d+\]\.priceType$/,
		updates: (value, name, formData, prevData) => {
			const prevValue = getValue(name, prevData);
			console.log('%c FormDecorator: ', 'color: MediumPurple;', name, value, prevValue);
			if (prevValue !== undefined && value !== prevValue ) {
				console.log('');
				console.log('%c useTicketPriceCalculatorFormDecorator ==> price.priceType: ', 'color:Violet; font-size:14px;');
				console.log('%c > name: ', 'color: magenta;', name);
				console.log('%c > value: ', 'color: magenta;', value);
				console.log('%c > formData: ', 'color: magenta;', formData);
				console.log('%c > prevData: ', 'color: magenta;', prevData);
			}
			return {};
		},
	},
	{
		field: 'ticket.reverseCalculate',
		updates: (value, name, formData, prevData) => {
			const prevValue = !! getValue(name, prevData);
			console.log('%c FormDecorator: ', 'color: MediumPurple;', name, value, prevValue);
			if (prevValue !== undefined && !! value !== prevValue) {
				console.log('');
				console.log('%c useTicketPriceCalculatorFormDecorator ==> ticket.reverseCalculate: ', 'color:Violet; font-size:14px;');
				console.log('%c > name: ', 'color: magenta;', name);
				console.log('%c > value: ', 'color: magenta;', !! value);
				console.log('%c > formData: ', 'color: magenta;', formData);
				console.log('%c > prevData: ', 'color: magenta;', prevData);
			}
			return {};
		},
	},
	{
		field: 'ticket.price',
		updates: (value, name, formData, prevData) => {
			const prevValue = getValue(name, prevData);
			console.log('%c FormDecorator: ', 'color: MediumPurple;', name, value, prevValue);
			if (prevValue !== undefined && value !== prevValue) {
				const reverseCalc = getValue('ticket.reverseCalculate', formData);
				// we don't want to update the base price if reverse calculate is false
				if (reverseCalc) {
					console.log('');
					console.log(
						'%c useTicketPriceCalculatorFormDecorator ==> ticket.price: ',
						'color:Violet; font-size:14px;'
					);
					console.log('%c > name: ', 'color: magenta;', name);
					console.log('%c > value: ', 'color: magenta;', value);
					console.log('%c > formData: ', 'color: magenta;', formData);
					console.log('%c > prevData: ', 'color: magenta;', prevData);
					const result = calculator(formData, { type: 'CALCULATE_BASE_PRICE' })
					console.log('%c > result: ', 'color: magenta;', result);
					const newBasePrice = getValue('prices[0].amount', result);
					console.log('%c > newBasePrice: ', 'color: magenta; font-size:14px;', newBasePrice);
					return { ['prices[0].amount']: newBasePrice };
				}
			}
			return {};
		},
	},
), [calculator] );

export default useTicketPriceCalculatorFormDecorator;
