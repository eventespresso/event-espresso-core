import { useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import useTicketFormConfig from '../ticketForm/useTicketFormConfig';
import { useFormModal, FormModal, ModalClose } from '@appLayout/formModal';
import { useTicketMutator, UpdateTicketInput } from '@edtrServices/apollo/mutations';
import useEvent from '@edtrServices/apollo/queries/events/useEvent';
import useRecalculateBasePrice from './useRecalculateBasePrice';
import { useTicketItem } from '@edtrServices/apollo/queries';

const useEditTicketModal: FormModal = ({ entityId, entityDbId }) => {
	const { updateEntity } = useTicketMutator(entityId);
	const { closeEditor } = useFormModal();
	const recalculateBasePrice = useRecalculateBasePrice(entityId);

	const ticket = useTicketItem({ id: entityId });

	const { name: eventName = '' } = useEvent() || {};

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('editTicket');
	}, [closeEditor]);

	const onSubmit = useCallback<FormProps<UpdateTicketInput>['onSubmit']>(
		(fields): void => {
			const priceHasChanged = fields.price !== ticket?.price;
			// if price has changed, reverseCalculate must be enabled
			const reverseCalculate = priceHasChanged ? true : fields?.reverseCalculate;
			updateEntity({ ...fields, reverseCalculate });
			if (priceHasChanged) {
				recalculateBasePrice();
			}
		},
		[updateEntity]
	);

	const formConfig = useTicketFormConfig(entityId, { onSubmit });

	return {
		title: `${eventName}: ${sprintf(__('Edit ticket %s'), `#${entityDbId}`)}`,
		formConfig,
		onClose,
	};
};

export default useEditTicketModal;
