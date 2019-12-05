import indexOf from 'ramda/src/indexOf';
import pickBy from 'ramda/src/pickBy';
import { useEffect, useState } from '@wordpress/element';

import TicketPriceCalculatorForm from './TicketPriceCalculatorForm';
import useTicketPriceCalculatorFormDecorator from './useTicketPriceCalculatorFormDecorator';
import useTicketPriceCalculatorFormMutators from './useTicketPriceCalculatorFormMutators';
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
	'dbid',
	'desc',
	'id',
	'isBasePrice',
	'isDiscount',
	'isPercent',
	'name',
	'order',
	'priceType',
];
const NO_INDEX = -1;
const isPriceFormField = (val, key) => indexOf(key, priceFormFields) > NO_INDEX;
const copyPriceFormFields = (price) => pickBy(isPriceFormField, price);

const ticketFormFields = [ 'id', 'reverseCalculate', 'order', 'price' ];
const isTicketFormField = (val, key) => indexOf(key, ticketFormFields) > NO_INDEX;
const copyTicketFormFields = (ticket) => pickBy(isTicketFormField, ticket);

const EMPTY_OBJECT = {};

const TicketPriceCalculatorModal = ({ ticket, handleClose, isOpen }) => {
	// const { prices } = useFetchTicketRelations({ ticket });
	const [initialValues, setInitialValues] = useState(EMPTY_OBJECT);
	const calculator = ticketPriceCalculator();
	const decorators = useTicketPriceCalculatorFormDecorator(calculator)();
	const mutators = useTicketPriceCalculatorFormMutators();

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
			decorators={[decorators]}
			mutators={mutators}
		/>
	);
};

export default TicketPriceCalculatorModal;
