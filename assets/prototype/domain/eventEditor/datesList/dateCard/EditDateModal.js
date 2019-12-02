import { useContext } from '@wordpress/element';
import FormModal from '../../../shared/FormModal';
import EditDateForm from '../EditDateForm';
import { DateTimeContext } from '../../../../infrastructure/services/contextProviders/DateTimeProvider';

const EditDateModal = ({ eventId, tickets, handleClose }) => {
	const { isOpen, onClose } = useContext(DateTimeContext);

	return (
		<FormModal
			tickets={tickets}
			FormComponent={EditDateForm}
			initialValues={{}}
			onSubmit={() => null}
			onClose={onClose}
			isOpen={isOpen}
		/>
	);
};

export default EditDateModal;
