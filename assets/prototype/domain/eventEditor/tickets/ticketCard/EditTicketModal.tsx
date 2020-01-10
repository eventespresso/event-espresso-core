import React, { useContext } from 'react';

import TicketForm from '../ticketForm/TicketForm';
import { TicketContext, TicketContextProps } from '../../context/TicketProvider';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import FormModal from '../../../../application/ui/components/forms/FormModal';

const EditTicketModal = ({ relatedDates }) => {
	const { editors, editorState, id } = useContext<TicketContextProps>(TicketContext);
	const isOpen = editorState.isEditorOpen(editors.editForm);
	const onClose = editorState.closeEditor(editors.editForm);

	const { updateEntity } = useEntityMutator(EntityType.Ticket, id);
	const onSubmit = (fields) => updateEntity(fields);
	const datetimes = useDatetimes();

	const formComponent = (props) => (
		<TicketForm {...props} datetimes={datetimes} relatedDates={relatedDates} title='Update ticket' />
	);

	return (
		<FormModal
			key={editors.editForm}
			FormComponent={formComponent}
			initialValues={{}}
			isOpen={isOpen}
			onSubmit={onSubmit}
			onClose={onClose}
		/>
	);
};

export default EditTicketModal;
