import DateForm from '../dateForm/DateForm';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import useEntityMutator from '../../../../application/services/apollo/mutations/useEntityMutator';

const AddNewDateModal = ({ tickets, handleClose, isOpen }) => {
	const { createEntity } = useEntityMutator('Datetime');
	const formComponent = (props) => <DateForm {...props} tickets={tickets} title='New Date Details' />;

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			onSubmit={createEntity}
			onClose={handleClose}
			isOpen={isOpen}
			tickets={tickets}
		/>
	);
};

export default AddNewDateModal;
