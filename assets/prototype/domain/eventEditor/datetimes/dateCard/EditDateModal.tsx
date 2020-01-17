import React, { useContext } from 'react';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import DatetimeForm from '../dateForm/DateForm';
import { DateTimeContext } from '../../context/DateTimeProvider';
import { useEntityMutator, EntityType, MutationResult } from '../../../../application/services/apollo/mutations';
import useTickets from '../../data/queries/tickets/useTickets';
import { EditDateModalProps } from '../types';

const EditDateModal: React.FC<EditDateModalProps> = ({ relatedTickets, id }): JSX.Element => {
	const { editors, editorState } = useContext(DateTimeContext);
	const isOpen = editorState.isEditorOpen(editors.editForm);
	const onClose = (): void => editorState.closeEditor(editors.editForm);

	const { updateEntity } = useEntityMutator(EntityType.Datetime, id);
	const onSubmit = (fields: any): MutationResult => updateEntity(fields);
	const tickets = useTickets();

	const formComponent: React.FC<any> = (props): JSX.Element => (
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
