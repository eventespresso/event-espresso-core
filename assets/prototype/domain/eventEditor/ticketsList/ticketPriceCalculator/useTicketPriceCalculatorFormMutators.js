import arrayMutators from 'final-form-arrays';
import {sortByPriceOrderIdAsc} from '../../../shared/entities/prices/sortingAlgorithms';

const useTicketPriceCalculatorFormMutators = () => {
	return {
		...arrayMutators,
		toggleCalcDir: (args, state, tools) => {
			console.log('%c toggleCalcDir: ', 'color:Salmon; font-size:18px;');
			console.log('%c > args: ', 'color: Salmon;', args);
			console.log('%c > state: ', 'color: Salmon;', state);
			console.log('%c > tools: ', 'color: Salmon;', tools);
			tools.changeValue(state, 'ticket.reverseCalculate', value => ! value)
		},
		reset: (args, state, tools) => {
			console.log('%c reset: ', 'color:Salmon; font-size:18px;');
			console.log('%c > args: ', 'color: Salmon;', args);
			console.log('%c > state: ', 'color: Salmon;', state);
			console.log('%c > tools: ', 'color: Salmon;', tools);
			if (args[1]) {
				console.log('%c > args[1]: ', 'color: Salmon;', args[1]);
				const fields = ['priceType', 'name', 'desc', 'amount']
				fields.forEach((field) => {
					const fieldName = `${args[1]}.${field}`;
					console.log('%c > > > fieldName: ', 'color: Salmon;', fieldName);
					const initialValue = tools.getIn(state, `formState.initialValues.${fieldName}`) || null;
					console.log('%c > > initialValue: ', 'color: Salmon;', initialValue);
					tools.resetFieldState(fieldName);
					tools.changeValue(state, fieldName, () => initialValue);
				});
			}
		},
		sort: (args, state, tools) => {
			console.log('%c sort: ', 'color:Salmon; font-size:18px;');
			console.log('%c > args: ', 'color: Salmon;', args);
			console.log('%c > state: ', 'color: Salmon;', state);
			console.log('%c > tools: ', 'color: Salmon;', tools);
			const prices = tools.getIn(state, 'formState.values.prices') || [];
			console.log('%c >> prices: ', 'color: Salmon;', prices);
			const sortedPrices = sortByPriceOrderIdAsc(prices);
			console.log('%c >>> sortedPrices: ', 'color: Salmon;', sortedPrices);
			tools.setIn(state, 'formState.values.prices', sortedPrices)
		},
	}
};

export default useTicketPriceCalculatorFormMutators;
