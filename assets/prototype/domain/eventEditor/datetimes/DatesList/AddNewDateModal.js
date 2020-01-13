import DateForm from '../dateForm/DateForm';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useTickets from '../../data/queries/tickets/useTickets';

const AddNewDateModal = ({ onClose, isOpen }) => {
	const { createEntity } = useEntityMutator(EntityType.Datetime);
	const tickets = useTickets();
	const formComponent = (props) => <DateForm {...props} tickets={tickets} title='New Date Details' />;

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			onSubmit={createEntity}
			onClose={onClose}
			isOpen={isOpen}
			tickets={tickets}
		/>
	);
};

export default AddNewDateModal;
