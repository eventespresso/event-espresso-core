import NewDateForm from './NewDateForm';
import FormModal from '../../shared/FormModal';
import useCreateDateMutation from '../containers/mutations/useCreateDateMutation';

const AddNewDateModal = ({ eventId, tickets, handleClose, isOpen }) => {
	const createDate = useCreateDateMutation({ eventId });

	return (
		<FormModal
			tickets={tickets}
			FormComponent={NewDateForm}
			initialValues={{}}
			onSubmit={createDate}
			onClose={handleClose}
			isOpen={isOpen}
		/>
	);
};

export default AddNewDateModal;
