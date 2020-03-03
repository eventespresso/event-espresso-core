import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import useDateFormConfig from './dateForm/useDateFormConfig';
import { useFormModal, FormModal, ModalClose } from '@appLayout/formModal';
import { useDatetimeMutator, CreateDatetimeInput } from '@edtrServices/apollo/mutations';
import useEvent from '@edtrServices/apollo/queries/events/useEvent';

const useAddDatetimeModal: FormModal = () => {
	const { createEntity } = useDatetimeMutator();
	const { closeEditor } = useFormModal();

	const { name: eventName = '' } = useEvent() || {};

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

	return {
		title: `${eventName}: ${__('New Datetime')}`,
		formConfig,
		onClose,
	};
};

export default useAddDatetimeModal;
