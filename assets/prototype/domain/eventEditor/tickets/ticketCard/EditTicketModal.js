import { useContext } from '@wordpress/element';
import FormModal from '../../../shared/FormModal';
import TicketForm from '../TicketForm';
import { TicketContext } from '../../../../infrastructure/services/contextProviders/TicketProvider';
import useEntityMutator from '../../containers/mutations/useEntityMutator';

const EditTicketModal = ({ datetimes, relatedDates }) => {
	const { id, isOpen, onClose } = useContext(TicketContext);
	const { updateEntity } = useEntityMutator('Ticket', id);

	const formComponent = (props) => (
		<TicketForm {...props} datetimes={datetimes} relatedDates={relatedDates} title='Update ticket' />
	);
	const onSubmit = (fields) => updateEntity(fields);

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
