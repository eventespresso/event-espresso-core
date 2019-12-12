import TicketForm from '../ticketForm/TicketForm';
import FormModal from '../../../shared/FormModal';
import useEntityMutator from '../../containers/mutations/useEntityMutator';

const AddNewTicketModal = ({ datetimes, handleClose, isOpen }) => {
	const { createEntity } = useEntityMutator('Ticket');
	const formComponent = (props) => <TicketForm {...props} title='New Ticket Details' />;

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			onSubmit={createEntity}
			onClose={handleClose}
			isOpen={isOpen}
			datetimes={datetimes}
		/>
	);
};

export default AddNewTicketModal;
