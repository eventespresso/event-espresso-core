import { useContext } from '@wordpress/element';
import FormModal from '../../../shared/FormModal';
import TicketForm from '../TicketForm';
import { TicketContext } from '../../../../infrastructure/services/contextProviders/TicketProvider';
import useUpdateTicketMutation from '../../containers/mutations/useUpdateTicketMutation';

const EditTicketModal = () => {
	const { id, isOpen, onClose, relatedDates } = useContext(TicketContext);
	const dates = relatedDates.map((id) => {
		// we need to get here full ticket objects
		return id;
	});

	const onFieldUpdate = useUpdateTicketMutation({ id });

	const formComponent = (props) => <TicketForm {...props} dates={dates} title='Update ticket' />;
	const onSubmit = (fields) => onFieldUpdate(fields);

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			isOpen={isOpen}
			onSubmit={onSubmit}
			onClose={onClose}
		/>
	);
};

export default EditTicketModal;
