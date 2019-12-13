import TicketForm from '../ticketForm/TicketForm';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import useEntityMutator from '../../../../application/services/apollo/mutations/useEntityMutator';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';

const AddNewTicketModal = ({ handleClose, isOpen }) => {
	const { createEntity } = useEntityMutator('Ticket');
	const datetimes = useDatetimes();
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
