import NewDateForm from './NewDateForm';
import FormModal from '../FormModal';
import useCreateDateMutation from '../containers/mutations/useCreateDateMutation';

const { console } = window.console;

const AddNewDateModal = ({ eventId, handleClose, isOpen }) => {
	const createDate = useCreateDateMutation({ eventId });
	console.log( '%c > createDate: ', 'color: HotPink;', createDate );
	const onSubmit = ({ description, name }) => {
		const variables = {
			input: { clientMutationId: 'xyz', description, name, eventId }
		};
		console.log( '%c > variables: ', 'color: tomato;', variables );
		return createDate({ variables });
	};

	return (
		<FormModal
			FormComponent={ NewDateForm }
			initialValues={ {} }
			onSubmit={ onSubmit }
			onClose={ handleClose }
			isOpen={ isOpen }
		/>
	);
};

export default AddNewDateModal;
