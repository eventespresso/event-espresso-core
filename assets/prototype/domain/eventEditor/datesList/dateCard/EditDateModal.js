import { useContext } from '@wordpress/element';
import FormModal from '../../../shared/FormModal';
import DateForm from '../DateForm';
import { DateTimeContext } from '../../../../infrastructure/services/contextProviders/DateTimeProvider';
import useUpdateDateMutation from '../../containers/mutations/useUpdateDateMutation';

const EditDateModal = () => {
	const { id, isOpen, onClose, relatedTickets } = useContext(DateTimeContext);
	const tickets = relatedTickets.map((id) => {
		// we need to get here full ticket objects
		return id;
	});

	const onFieldUpdate = useUpdateDateMutation({ id });

	const formComponent = (props) => <DateForm {...props} tickets={tickets} title='Update date' />;
	const onSubmit = (fields) => onFieldUpdate(fields);

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			isOpen={isOpen}
			onSubmit={onSubmit}
			onClose={onClose}
			tickets={tickets}
		/>
	);
};

export default EditDateModal;
