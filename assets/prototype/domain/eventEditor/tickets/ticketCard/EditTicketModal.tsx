import React from 'react';

import TicketForm from '../ticketForm/TicketForm';
import { useTicketContext } from '../../hooks';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import { useEntityMutator, EntityType, MutationResult } from '../../../../application/services/apollo/mutations';
import FormModal from '../../../../application/ui/components/forms/FormModal/FormModal';
import { TicketItemFormProps } from '../types';
import { EditTicketModalProps } from '../types';

const EditTicketModal: React.FC<EditTicketModalProps> = ({ relatedDates }): JSX.Element => {
	const { editors, editorState, id } = useTicketContext();
	const isOpen = editorState.isEditorOpen(editors.editForm);
	const onClose = editorState.closeEditor(editors.editForm);

	const { updateEntity } = useEntityMutator(EntityType.Ticket, id);
	const onSubmit = (fields: any): MutationResult => updateEntity(fields);
	const datetimes = useDatetimes();

	const formComponent: React.FC<TicketItemFormProps> = (props): JSX.Element => (
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
