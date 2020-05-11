import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import useTicketFormConfig from '../ticketForm/useTicketFormConfig';
import { useFormModal, FormModal, ModalClose } from '@appLayout/formModal';
import { useTicketMutator, CreateTicketInput } from '@edtrServices/apollo/mutations';
import { useEvent } from '@edtrServices/apollo/queries/events';

const useAddTicketModal: FormModal = () => {
	const { createEntity } = useTicketMutator();
	const { closeEditor } = useFormModal();

	const event = useEvent();

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
	const title = event?.name ? `${event.name}: ${__('New Ticket Details')}` : __('New Ticket Details');

	return {
		formConfig,
		onClose,
		title,
	};
};

export default useAddTicketModal;
