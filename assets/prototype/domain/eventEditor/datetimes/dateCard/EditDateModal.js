import { useContext } from 'react';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import DatetimeForm from '../dateForm/DateForm';
import { DateTimeContext } from '../../context/DateTimeProvider';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useTickets from '../../data/queries/tickets/useTickets';

const EditDateModal = ({ relatedTickets }) => {
	const { id, editors, editorState } = useContext(DateTimeContext);
	const isOpen = editorState.getIsOpen(editors.editForm);
	const onClose = editorState.onClose(editors.editForm);
	const { updateEntity } = useEntityMutator(EntityType.Datetime, id);
	const tickets = useTickets();

	const formComponent = (props) => (
		<DatetimeForm {...props} relatedTickets={relatedTickets} tickets={tickets} title='Update date' />
	);
	const onSubmit = (fields) => updateEntity(fields);

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
