import { useContext } from 'react';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import TicketForm from '../ticketForm/TicketForm';
import { TicketContext } from '../../context/TicketProvider';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';

const EditTicketModal = ({ relatedDates }) => {
	const { editors, editorState, id } = useContext(TicketContext);
	const isOpen = editorState.isEditorOpen(editors.editForm);
	const onClose = () => editorState.closeEditor(editors.editForm);

	const { updateEntity } = useEntityMutator(EntityType.Ticket, id);
	const onSubmit = (fields) => updateEntity(fields);
	const datetimes = useDatetimes();

	const formComponent = (props) => (
		<TicketForm {...props} datetimes={datetimes} relatedDates={relatedDates} title='Update ticket' />
	);

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
