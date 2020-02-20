import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import useTicketFormConfig from './ticketForm/useTicketFormConfig';
import { useEditorModal, EditorModal, ModalClose } from '@appLayout/editorModal';
import { useTicketMutator, CreateTicketInput } from '@edtrServices/apollo/mutations';
import useEvent from '@edtrServices/apollo/queries/events/useEvent';

const useAddTicketModal: EditorModal = () => {
	const { createEntity } = useTicketMutator();
	const { closeEditor } = useEditorModal();

	const { name: eventName = '' } = useEvent() || {};

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('addTicket');
	}, [closeEditor]);

	const onSubmit = useCallback<FormProps<CreateTicketInput>['onSubmit']>(
		(fields): void => {
			createEntity(fields);
		},
		[createEntity]
	);

	const formConfig = useTicketFormConfig(null, { onSubmit });

	return {
		title: `${eventName}: ${__('New Ticket Details')}`,
		formConfig,
		onClose,
	};
};

export default useAddTicketModal;
