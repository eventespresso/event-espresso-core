import NewTicketForm from './NewTicketForm';
import FormModal from '../../shared/FormModal';
import useCreateTicketMutation from '../containers/mutations/useCreateTicketMutation';

const AddNewTicketModal = ({ datetimes, handleClose, isOpen }) => {
	const createTicket = useCreateTicketMutation({ datetimes });

	return (
		<FormModal
			FormComponent={NewTicketForm}
			initialValues={{}}
			onSubmit={createTicket}
			onClose={handleClose}
			isOpen={isOpen}
			datetimes={datetimes}
		/>
	);
};

export default AddNewTicketModal;
