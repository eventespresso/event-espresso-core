import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import DateForm from './dateForm/DateForm';
import useDateFormConfig from './dateForm/useDateFormConfig';
import { DateItemFormProps } from './types';
import { useEditorModal, EditorModal, ModalClose } from '@appLayout/editorModal';
import { useDatetimeMutator, UpdateDatetimeInput } from '@edtrServices/apollo/mutations';
import useEvent from '@edtrServices/apollo/queries/events/useEvent';

const useEditDatetimeModal: EditorModal = (entityId) => {
	const { updateEntity } = useDatetimeMutator(entityId);
	const { closeEditor } = useEditorModal();

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
