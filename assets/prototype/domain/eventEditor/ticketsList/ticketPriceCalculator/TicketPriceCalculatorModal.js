import TicketPriceCalculatorForm from './TicketPriceCalculatorForm';
import FormModal from '../../../shared/FormModal';
// import useFetchTicketRelations from '../../containers/mutations/useFetchTicketRelations';

const TicketPriceCalculatorModal = ({ ticket, handleClose, isOpen }) => {
	// const { prices } = useFetchTicketRelations({ ticket });
	const prices = [
		{
			id: 'ABC123',
			priceId: 1234,
			amount: 9.99,
			desc: 'Base Price',
			isBasePrice: true,
			isDeleted: false,
			isDefault: false,
			isDiscount: false,
			isPercent: false,
			name: 'Price ABC',
			priceType: 1,
			order: 1,
			wpUser: 1,
		},
		{
			id: 'DEF456',
			priceId: 1235,
			amount: 10,
			desc: 'just to be nice',
			isBasePrice: false,
			isDeleted: false,
			isDefault: false,
			isDiscount: true,
			isPercent: true,
			name: 'ten % off',
			priceType: 2,
			order: 2,
			wpUser: 1,
		},
		{
			id: 'XYZ890',
			priceId: 1236,
			amount: 2.5,
			desc: 'Just Cuz Fee',
			isBasePrice: false,
			isDeleted: false,
			isDefault: false,
			isDiscount: false,
			isPercent: false,
			name: 'gimme gimme',
			priceType: 5,
			order: 3,
			wpUser: 1,
		},
		{
			id: 'TAX123',
			priceId: 1237,
			amount: 10,
			desc: 'theft',
			isBasePrice: false,
			isDeleted: false,
			isDefault: false,
			isDiscount: false,
			isPercent: true,
			name: 'tax',
			priceType: 7,
			order: 4,
			wpUser: 1,
		},
	];
	return (
		<FormModal
			FormComponent={TicketPriceCalculatorForm}
			initialValues={{}}
			isOpen={isOpen}
			onSubmit={(values) => console.log('%c Ticket Price Calculator Form Submit', 'color:YellowGreen;', values)}
			onClose={handleClose}
			prices={prices}
			ticket={ticket}
		/>
	);
};

export default TicketPriceCalculatorModal;
