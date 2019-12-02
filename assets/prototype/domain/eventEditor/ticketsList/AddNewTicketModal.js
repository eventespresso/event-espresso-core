import TicketForm from './TicketForm';
import FormModal from '../../shared/FormModal';
import useCreateTicketMutation from '../containers/mutations/useCreateTicketMutation';

const AddNewTicketModal = ({ datetimes, handleClose, isOpen }) => {
	const createTicket = useCreateTicketMutation({ datetimes });
	const formComponent = (props) => <TicketForm {...props} title='New Ticket Details' />;

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			onSubmit={createTicket}
			onClose={handleClose}
			isOpen={isOpen}
			datetimes={datetimes}
		/>
	);
};

export default AddNewTicketModal;
