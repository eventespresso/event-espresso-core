import { useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import useDateFormConfig from '../dateForm/useDateFormConfig';
import { useFormModal, FormModal, ModalClose } from '@application/ui/layout/formModal';
import {
	useDatetimeMutator,
	useTicketQuantityForCapacity,
	useUpdateRelatedTickets,
	UpdateDatetimeInput,
} from '@edtrServices/apollo/mutations';
import useEvent from '@edtrServices/apollo/queries/events/useEvent';
import { useDatetimeItem } from '@edtrServices/apollo';

const useEditDatetimeModal: FormModal = ({ entityId, entityDbId }) => {
	const { updateEntity } = useDatetimeMutator(entityId);
	const { closeEditor } = useFormModal();

	const updateRelatedTickets = useUpdateRelatedTickets(entityId);
	const ticketQuantityForCapacity = useTicketQuantityForCapacity();

	const event = useEvent();

	const datetime = useDatetimeItem({ id: entityId });

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('editDatetime');
	}, [closeEditor]);

	const onSubmit = useCallback<FormProps<UpdateDatetimeInput>['onSubmit']>(
		(fields): void => {
			updateEntity(fields);

			const capacityChanged = fields?.capacity !== datetime?.capacity;

			if (capacityChanged) {
				const inputGenerator = ticketQuantityForCapacity(fields?.capacity);
				updateRelatedTickets(inputGenerator);
			}
		},
		[datetime, updateEntity, updateRelatedTickets]
	);

	const formConfig = useDateFormConfig(entityId, { onSubmit });

	let title = sprintf(__('Edit datetime %s'), `#${entityDbId}`);
	title = event?.name ? `${event.name}: ${title}` : title;

	return {
		title,
		formConfig,
		onClose,
	};
};

export default useEditDatetimeModal;
