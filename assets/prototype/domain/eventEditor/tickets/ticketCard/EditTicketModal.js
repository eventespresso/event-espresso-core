import { useContext } from '@wordpress/element';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import TicketForm from '../ticketForm/TicketForm';
import { TicketContext } from '../../context/TicketProvider';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';

const EditTicketModal = ({ relatedDates }) => {
	const { id, getIsOpen, onClose } = useContext(TicketContext);
	const isOpen = getIsOpen();
	const datetimes = useDatetimes();
	const { updateEntity } = useEntityMutator(EntityType.Ticket, id);

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
			onClose={() => onClose()}
		/>
	);
};

export default EditTicketModal;
