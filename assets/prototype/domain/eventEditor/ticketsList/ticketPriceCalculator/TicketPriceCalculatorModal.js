import indexOf from 'ramda/src/indexOf';
import pickBy from 'ramda/src/pickBy';
import arrayMutators from 'final-form-arrays';
import { useEffect, useState } from '@wordpress/element';

import TicketPriceCalculatorForm from './TicketPriceCalculatorForm';
import useTicketPriceCalculatorFormDecorator from './useTicketPriceCalculatorFormDecorator';
import ticketPriceCalculator from './reducers/ticketPriceCalculator';
import {sortByPriceOrderIdAsc} from '../../../shared/entities/prices/sortingPredicates';


import FormModal from '../../../shared/FormModal';
// import useFetchTicketRelations from '../../containers/mutations/useFetchTicketRelations';
const prices = [
	{
		id: 'NEW_PRICE',
		dbid: '',
		amount: null,
		desc: '',
		isBasePrice: false,
		isDeleted: false,
		isDefault: false,
		isDiscount: false,
		isPercent: false,
		name: '',
		priceType: 5,
		order: 999,
		wpUser: 1,
	},
	{
		id: 'ABC123',
		dbid: 1234,
		amount: 9.99,
		desc: 'Base Price',
		isBasePrice: true,
		isDeleted: false,
		isDefault: false,
		isDiscount: false,
		isPercent: false,
		name: 'Price ABC',
		priceType: 1,
		order: 0,
		wpUser: 1,
	},
	{
		id: 'DEF456',
		dbid: 1235,
		amount: 10,
		desc: 'just to be nice',
		isBasePrice: false,
		isDeleted: false,
		isDefault: false,
		isDiscount: true,
		isPercent: true,
		name: 'ten % off',
		priceType: 2,
		order: 20,
		wpUser: 1,
	},
	{
		id: 'XYZ890',
		dbid: 1236,
		amount: 2.5,
		desc: 'Just Cuz Fee',
		isBasePrice: false,
		isDeleted: false,
		isDefault: false,
		isDiscount: false,
		isPercent: false,
		name: 'gimme gimme',
		priceType: 5,
		order: 50,
		wpUser: 1,
	},
	{
		id: 'TAX123',
		dbid: 1237,
		amount: 10,
		desc: 'theft',
		isBasePrice: false,
		isDeleted: false,
		isDefault: false,
		isDiscount: false,
		isPercent: true,
		name: 'tax',
		priceType: 7,
		order: 70,
		wpUser: 1,
	},
];
const priceFormFields = [
	'amount',
	'desc',
	'id',
	'isBasePrice',
	'isDiscount',
	'isPercent',
	'name',
	'order',
	'dbid',
	'priceType',
];
const isPriceFormField = (val, key) => indexOf(key, priceFormFields) > -1;
const copyPriceFormFields = (price) => pickBy(isPriceFormField, price);

const ticketFormFields = [ 'id', 'reverseCalculate', 'order', 'price' ];
const isTicketFormField = (val, key) => indexOf(key, ticketFormFields) > -1;
const copyTicketFormFields = (ticket) => pickBy(isTicketFormField, ticket);

const EMPTY_OBJECT = {};

const TicketPriceCalculatorModal = ({ ticket, handleClose, isOpen }) => {
	// const { prices } = useFetchTicketRelations({ ticket });
	const [initialValues, setInitialValues] = useState(EMPTY_OBJECT);
	const calculator = ticketPriceCalculator();
	const decorator = useTicketPriceCalculatorFormDecorator(calculator)();

	useEffect(() => {
		if (initialValues === EMPTY_OBJECT) {
			const sortedPrices = sortByPriceOrderIdAsc(prices);
			const formData = {
				ticket: copyTicketFormFields(ticket),
				prices: sortedPrices.map(copyPriceFormFields),
			};
			setInitialValues(formData);
		}
	});
	return (
		<FormModal
			FormComponent={TicketPriceCalculatorForm}
			initialValues={initialValues}
			isOpen={isOpen}
			onSubmit={(values) => console.log('%c Ticket Price Calculator Form Submit', 'color:YellowGreen;', values)}
			onClose={handleClose}
			decorators={[decorator]}
			mutators={{
				...arrayMutators,
				toggleCalcDir: (args, state, tools) => {
					console.log('%c toggleCalcDir: ', 'color:Salmon; font-size:18px;');
					console.log('%c > args: ', 'color: Salmon;', args);
					console.log('%c > state: ', 'color: Salmon;', state);
					console.log('%c > tools: ', 'color: Salmon;', tools);
					tools.changeValue(state, 'ticket.reverseCalculate', value => !value)
				},
				reset: (args, state, tools) => {
					console.log('%c reset: ', 'color:Salmon; font-size:18px;');
					console.log('%c > args: ', 'color: Salmon;', args);
					console.log('%c > state: ', 'color: Salmon;', state);
					console.log('%c > tools: ', 'color: Salmon;', tools);
					if(args[1]) {
						console.log('%c > args[1]: ', 'color: Salmon;', args[1]);
						const fields = ['priceType', 'name', 'desc', 'amount']
						fields.forEach((field) => {
							const fieldName = `${args[1]}.${field}`;
							console.log('%c > > > fieldName: ', 'color: Salmon;', fieldName );
							const initialValue = tools.getIn(state, `formState.initialValues.${fieldName}`) || null;
							console.log('%c > > initialValue: ', 'color: Salmon;', initialValue);
							tools.resetFieldState(fieldName);
							tools.changeValue(state, fieldName, () => initialValue );
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
			}}
		/>
	);
};

export default TicketPriceCalculatorModal;
