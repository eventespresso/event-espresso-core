import React, { useCallback } from 'react';
import TicketForm from './ticketForm/TicketForm';
import { useEntityMutator, EntityType } from '../../../application/services/apollo/mutations';
import { TicketItemFormProps } from './types';
import {
	useEditorModal,
	EditorModal,
	EditorModalCallback,
} from '../../../application/ui/components/layout/eeditorModal';

const useEditTicketModal: EditorModal = (entityId): EditorModalCallback => {
	const { updateEntity } = useEntityMutator(EntityType.Ticket, entityId);
	const { closeEditor } = useEditorModal();

	return useCallback<EditorModalCallback>(() => {
		const onSubmit = (fields: any): void => {
			updateEntity({ ...fields });
		};

		const onClose = (): void => {
			closeEditor('editTicket');
		};

		const formComponent: React.FC<TicketItemFormProps> = (props): JSX.Element => (
			// id prop is needed because modal is out of TicketContext
			<TicketForm {...props} id={entityId} title='Update ticket' />
		);

		return {
			formComponent,
			onSubmit,
			onClose,
		};
	}, []);
};

export default useEditTicketModal;
