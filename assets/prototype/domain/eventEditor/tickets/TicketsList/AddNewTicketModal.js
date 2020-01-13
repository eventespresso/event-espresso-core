import TicketForm from '../ticketForm/TicketForm';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';

const AddNewTicketModal = ({ onClose, isOpen }) => {
	const { createEntity } = useEntityMutator(EntityType.Ticket);
	const datetimes = useDatetimes();
	const formComponent = (props) => <TicketForm {...props} title='New Ticket Details' />;

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			onSubmit={createEntity}
			onClose={onClose}
			isOpen={isOpen}
			datetimes={datetimes}
		/>
	);
};

export default AddNewTicketModal;
