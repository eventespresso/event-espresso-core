import { useContext } from '@wordpress/element';
import FormModal from '../../../shared/FormModal';
import TicketForm from '../TicketForm';
import { TicketContext } from '../../../../infrastructure/services/contextProviders/TicketProvider';
import useUpdateTicketMutation from '../../containers/mutations/useUpdateTicketMutation';

const EditTicketModal = ({ datetimes, relatedDates }) => {
	const { id, isOpen, onClose } = useContext(TicketContext);
	const onFieldUpdate = useUpdateTicketMutation({ id });

	const formComponent = (props) => (
		<TicketForm {...props} datetimes={datetimes} relatedDates={relatedDates} title='Update ticket' />
	);
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
