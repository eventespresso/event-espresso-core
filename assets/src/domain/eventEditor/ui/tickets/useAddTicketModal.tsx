import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import TicketForm from './ticketForm/TicketForm';
import { TicketItemFormProps } from './types';
import { useEditorModal, EditorModal, ModalSubmit, ModalClose } from '../../../../application/ui/layout/editorModal';
import { useTicketMutator } from '@edtrServices/apollo/mutations';

const useAddTicketModal: EditorModal = () => {
	const { createEntity } = useTicketMutator();
	const { closeEditor } = useEditorModal();

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('addTicket');
	}, [closeEditor]);

	const onSubmit = useCallback<ModalSubmit>(
		(fields: any): void => {
			createEntity(fields);
		},
		[createEntity]
	);

	const formComponent = useCallback<React.FC<TicketItemFormProps>>(
		(props) => <TicketForm {...props} title={__('New Ticket Details')} />,
		[]
	);

	return {
		formComponent,
		onSubmit,
		onClose,
	};
};

export default useAddTicketModal;
