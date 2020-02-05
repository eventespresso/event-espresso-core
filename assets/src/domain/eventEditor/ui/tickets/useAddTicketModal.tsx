import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import TicketForm from './ticketForm/TicketForm';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import { TicketItemFormProps } from './types';
import {
	useEditorModal,
	EditorModal,
	ModalSubmit,
	ModalClose,
} from '../../../../application/ui/components/layout/editorModal';

const useAddTicketModal: EditorModal = () => {
	const { createEntity } = useEntityMutator(EntityType.Ticket);
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
		(props): JSX.Element => <TicketForm {...props} title={__('New Ticket Details')} />,
		[]
	);

	return {
		formComponent,
		onSubmit,
		onClose,
	};
};

export default useAddTicketModal;
