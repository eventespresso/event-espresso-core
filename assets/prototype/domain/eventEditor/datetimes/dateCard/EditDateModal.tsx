import React from 'react';
import FormModal from '../../../../application/ui/components/forms/formModal/FormModal';
import DatetimeForm from '../dateForm/DateForm';
import { useDatetimeContext } from './../../hooks';
import { useEntityMutator, EntityType, MutationResult } from '../../../../application/services/apollo/mutations';
import useTickets from '../../data/queries/tickets/useTickets';
import { DateItemFormProps } from '../types';
import { EditDateModalProps } from '../types';

const EditDateModal: React.FC<EditDateModalProps> = ({ relatedTickets }): JSX.Element => {
	const { editors, editorState, id } = useDatetimeContext();
	const isOpen = editorState.isEditorOpen(editors.editForm);
	const onClose = (): void => editorState.closeEditor(editors.editForm);

	const { updateEntity } = useEntityMutator(EntityType.Datetime, id);
	const onSubmit = (fields: any): MutationResult => updateEntity(fields);
	const tickets = useTickets();

	const formComponent: React.FC<DateItemFormProps> = (props): JSX.Element => (
		<DatetimeForm {...props} relatedTickets={relatedTickets} tickets={tickets} title='Update date' />
	);

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
