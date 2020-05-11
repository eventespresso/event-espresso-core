import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import useDateFormConfig from '../dateForm/useDateFormConfig';
import { useFormModal, FormModal, ModalClose } from '@appLayout/formModal';
import { useDatetimeMutator, CreateDatetimeInput } from '@edtrServices/apollo/mutations';
import { useEvent } from '@edtrServices/apollo/queries/events';

const useAddDatetimeModal: FormModal = () => {
	const { createEntity } = useDatetimeMutator();
	const { closeEditor } = useFormModal();

	const event = useEvent();

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('addDatetime');
	}, [closeEditor]);

	const onSubmit = useCallback<FormProps<CreateDatetimeInput>['onSubmit']>(
		(fields): void => {
			createEntity(fields);
		},
		[createEntity]
	);

	const formConfig = useDateFormConfig(null, { onSubmit });
	const title = event?.name ? `${event.name}: ${__('New Datetime')}` : __('New Datetime');

	return {
		formConfig,
		onClose,
		title,
	};
};

export default useAddDatetimeModal;
