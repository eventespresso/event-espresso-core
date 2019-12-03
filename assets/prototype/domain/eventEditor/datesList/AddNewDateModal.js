import DateForm from './DateForm';
import FormModal from '../../shared/FormModal';
import useCreateDateMutation from '../containers/mutations/useCreateDateMutation';

const AddNewDateModal = ({ eventId, tickets, handleClose, isOpen }) => {
	const createDate = useCreateDateMutation({ eventId });
	const formComponent = (props) => <DateForm {...props} tickets={tickets} title='New Date Details' />;

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			onSubmit={createDate}
			onClose={handleClose}
			isOpen={isOpen}
			tickets={tickets}
		/>
	);
};

export default AddNewDateModal;
