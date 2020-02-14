import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import TicketForm from './ticketForm/TicketForm';
import { TicketItemFormProps } from './types';
import { useEditorModal, EditorModal, ModalSubmit, ModalClose } from '../../../../application/ui/layout/editorModal';
import { useTicketMutator } from '@edtrServices/apollo/mutations';

const useEditTicketModal: EditorModal = (entityId) => {
	const { updateEntity } = useTicketMutator(entityId);
	const { closeEditor } = useEditorModal();

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('editTicket');
	}, [closeEditor]);

	const onSubmit = useCallback<ModalSubmit>(
		(fields: any): void => {
			updateEntity({ ...fields });
		},
		[updateEntity]
	);

	const formComponent = useCallback<React.FC<TicketItemFormProps>>(
		(props) => (
			// id prop is needed because modal is out of TicketContext
			<TicketForm {...props} id={entityId} title={__('Update ticket')} />
		),
		[entityId]
	);

	return {
		formComponent,
		onSubmit,
		onClose,
	};
};

export default useEditTicketModal;
