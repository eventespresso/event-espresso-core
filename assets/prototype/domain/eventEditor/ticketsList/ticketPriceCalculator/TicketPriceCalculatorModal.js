import indexOf from 'ramda/src/indexOf';
import isEmpty from 'ramda/src/isEmpty';
import pickBy from 'ramda/src/pickBy';
import { useEffect, useState } from '@wordpress/element';

import TicketPriceCalculatorForm from './TicketPriceCalculatorForm';
import useTicketPriceCalculatorFormDecorator from './hooks/useTicketPriceCalculatorFormDecorator';
import useTicketPriceCalculatorFormMutators from './hooks/useTicketPriceCalculatorFormMutators';
import { sortByPriceOrderIdAsc } from '../../../shared/predicates/prices/sortingPredicates';
import useTicketPrices from '../../containers/queries/useTicketPrices';

import FormModal from '../../../shared/FormModal';

const newPrice = {
	id: 'NEW_PRICE',
	dbId: '',
	amount: null,
	desc: '',
	isBasePrice: false,
	isDeleted: false,
	isDefault: false,
	isDiscount: false,
	isPercent: false,
	isTax: false,
	name: '',
	order: 999,
	priceType: 4,
	priceTypeOrder: 999,
	wpUser: 1,
};

const priceFields = [
	'id',
	'dbId',
	'amount',
	'desc',
	'isBasePrice',
	'isDiscount',
	'isDeleted',
	'isPercent',
	'isTax',
	'name',
	'order',
	'priceType',
	'priceTypeOrder',
];

const NO_INDEX = -1;
const isPriceField = (val, key) => indexOf(key, priceFields) > NO_INDEX;
const copyPriceFields = (price) => pickBy(isPriceField, price);

const ticketFields = ['id', 'reverseCalculate', 'order', 'price'];
const isTicketField = (val, key) => indexOf(key, ticketFields) > NO_INDEX;
const copyTicketFields = (ticket) => pickBy(isTicketField, ticket);

const EMPTY_OBJECT = {};

const onSubmit = (values) => console.log('%c Ticket Price Calculator Form Submit', 'color:YellowGreen;', values);

const TicketPriceCalculatorModal = ({ ticket, handleClose, isOpen }) => {
	const [initialValues, setInitialValues] = useState(EMPTY_OBJECT);
	const decorator = useTicketPriceCalculatorFormDecorator();
	const mutators = useTicketPriceCalculatorFormMutators();
	const prices = useTicketPrices(ticket.id);

	useEffect(() => {
		if (initialValues === EMPTY_OBJECT && ! isEmpty(prices)) {
			const sortedPrices = sortByPriceOrderIdAsc(prices);
			sortedPrices.push(newPrice);
			const formData = {
				ticket: copyTicketFields(ticket),
				prices: sortedPrices.map(copyPriceFields),
			};
			setInitialValues(formData);
		}
	});
	return initialValues !== EMPTY_OBJECT && (
		<FormModal
			FormComponent={TicketPriceCalculatorForm}
			initialValues={initialValues}
			isOpen={isOpen}
			onSubmit={onSubmit}
			onClose={handleClose}
			decorators={[decorator]}
			mutators={mutators}
		/>
	);
};

export default TicketPriceCalculatorModal;
