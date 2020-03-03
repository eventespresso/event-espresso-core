import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import useDateFormConfig from './dateForm/useDateFormConfig';
import { useFormModal, FormModal, ModalClose } from '@application/ui/layout/formModal';
import { useDatetimeMutator, UpdateDatetimeInput } from '@edtrServices/apollo/mutations';
import useEvent from '@edtrServices/apollo/queries/events/useEvent';

const useEditDatetimeModal: FormModal = (entityId) => {
	const { updateEntity } = useDatetimeMutator(entityId);
	const { closeEditor } = useFormModal();

	const { name: eventName = '' } = useEvent() || {};

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('editDatetime');
	}, [closeEditor]);

	const onSubmit = useCallback<FormProps<UpdateDatetimeInput>['onSubmit']>(
		(fields): void => {
			updateEntity(fields);
		},
		[updateEntity]
	);

	const formConfig = useDateFormConfig(entityId, { onSubmit });

	return {
		title: `${eventName}: ${__('Update datetime')}`,
		formConfig,
		onClose,
	};
};

export default useEditDatetimeModal;
