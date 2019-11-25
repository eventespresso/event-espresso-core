import NewDateForm from './NewDateForm';
import FormModal from '../../shared/FormModal';
import useCreateDateMutation from '../containers/mutations/useCreateDateMutation';

const AddNewDateModal = ({ eventId, handleClose, isOpen }) => {
	const createDate = useCreateDateMutation({ eventId });

	return (
		<FormModal
			FormComponent={NewDateForm}
			initialValues={{}}
			onSubmit={createDate}
			onClose={handleClose}
			isOpen={isOpen}
		/>
	);
};

export default AddNewDateModal;
