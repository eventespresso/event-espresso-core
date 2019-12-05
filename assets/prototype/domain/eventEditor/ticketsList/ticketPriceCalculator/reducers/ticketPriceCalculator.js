// import {useReducer} from '@wordpress/element';
import calculatorReducer from './calculatorReducer';
import pricesReducer from './pricesReducer';
import ticketsReducer from './ticketsReducer';
import sortPrices from '../../../../shared/entities/prices/sortingPredicates';


const combineReducers = (...reducers) => (state, action, ...args) =>
	reducers.reduce( (newState, reducer) => reducer(newState, action, ...args), state);

const ticketPriceCalculator = () => {
	// console.log('%c > formData: ', 'color: cyan;', formData);
	// const prices = [];
	// for (const id in formData.prices) {
	// 	console.log('%c > > > price id: ', 'color:cyan;', id);
	// 	prices.push(formData.prices[id]);
	// }
	// console.log( '%c > prices: ', 'color: cyan;', prices );
	// const sortTicketPrices = sortPrices(formData.ticket);
	// const sortedPrices = sortTicketPrices(prices);
	// console.log('%c > sortedPrices: ', 'color: cyan;', sortedPrices);
	// const calculator = combineReducers(pricesReducer, ticketsReducer, calculatorReducer);
	return combineReducers(pricesReducer, ticketsReducer, calculatorReducer);
}

export default ticketPriceCalculator;
