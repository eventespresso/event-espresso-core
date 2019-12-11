import arrayMutators from 'final-form-arrays';
import propOr from 'ramda/src/propOr';
import { sortByPriceOrderIdAsc } from '../../../../shared/predicates/prices/sortingPredicates';

const useTicketPriceCalculatorFormMutators = () => {
	return {
		...arrayMutators,
		toggleCalcDir: (args, state, tools) => {
			tools.changeValue(state, 'ticket.reverseCalculate', (value) => !value);
		},
		reset: (args, state, tools) => {
			const path = propOr(String, 1, args) ? args[1] : null;
			if (path) {
				const fields = ['priceType', 'name', 'desc', 'amount'];
				fields.forEach((field) => {
					const fieldName = `${path}.${field}`;
					const initialValue = tools.getIn(state, `formState.initialValues.${fieldName}`) || null;
					tools.resetFieldState(fieldName);
					tools.changeValue(state, fieldName, () => initialValue);
				});
			}
		},
		sort: (args, state, tools) => {
			const prices = tools.getIn(state, 'formState.values.prices') || [];
			const sortedPrices = sortByPriceOrderIdAsc(prices);
			const newState = tools.setIn(state, 'formState.values.prices', sortedPrices);
			Object.assign(state, newState);
		},
	};
};

export default useTicketPriceCalculatorFormMutators;
