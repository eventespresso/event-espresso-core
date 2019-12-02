import { useContext } from '@wordpress/element';
import FormModal from '../../../shared/FormModal';
import DateForm from '../DateForm';
import { DateTimeContext } from '../../../../infrastructure/services/contextProviders/DateTimeProvider';

const EditDateModal = ({ tickets }) => {
	const { isOpen, onClose } = useContext(DateTimeContext);

	const formComponent = (props) => <DateForm {...props} title='Update date' />;

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			isOpen={isOpen}
			onSubmit={() => null}
			onClose={onClose}
			tickets={tickets}
		/>
	);
};

export default EditDateModal;
