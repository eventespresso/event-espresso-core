import React, { useCallback } from 'react';
import TicketForm from './ticketForm/TicketForm';
import { useEntityMutator, EntityType } from '../../../application/services/apollo/mutations';
import { TicketItemFormProps } from './types';
import {
	useEditorModal,
	EditorModal,
	EditorModalCallback,
} from '../../../application/ui/components/layout/eeditorModal';

const useAddTicketModal: EditorModal = () => {
	const { createEntity } = useEntityMutator(EntityType.Ticket);
	const { closeEditor } = useEditorModal();

	return useCallback<EditorModalCallback>(() => {
		const onSubmit = (fields: any): void => {
			createEntity(fields);
		};

		const onClose = (): void => {
			closeEditor('addTicket');
		};

		const formComponent = (props: TicketItemFormProps): JSX.Element => (
			<TicketForm {...props} title='New Ticket Details' />
		);
		return {
			formComponent,
			onSubmit,
			onClose,
		};
	}, []);
};

export default useAddTicketModal;
